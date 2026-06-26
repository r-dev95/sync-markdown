import type { BlockContent, Blockquote, Paragraph, Parent, Root, Text } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { PluginOptions } from '../../types/transform.js';

const searchGfmAlert = (props: {
  node: Blockquote;
  index: number;
  parent: Parent;
  tagStack: { node: Blockquote; index: number; parent: Parent }[];
}): { node: Blockquote; index: number; parent: Parent }[] => {
  const { node, index, parent } = props;
  let { tagStack } = props;

  const paragraphNode = node.children[0];
  if (!paragraphNode || paragraphNode.type !== 'paragraph') return tagStack;
  const textNode = paragraphNode.children[0];
  if (!textNode || textNode.type !== 'text') return tagStack;

  // ネスト対応のため開始タグの情報を保持する
  const match = textNode.value.match(/^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*$/gm);
  if (match) {
    tagStack.push({ node, index, parent });
  }
  // 再帰的に探索する
  node.children.forEach((child, childIndex) => {
    if (child.type === 'blockquote') {
      tagStack = searchGfmAlert({ node: child, index: childIndex, parent: node, tagStack });
    }
  });

  return tagStack;
};

const replaceGfmAlert = (props: {
  node: Blockquote;
  index: number;
  parent: Parent;
  replaceStartTag: (textNode: Text, colon: string) => string;
}) => {
  const { node, index, parent, replaceStartTag } = props;

  const tagStack = searchGfmAlert({ node, index, parent, tagStack: [] });
  if (tagStack.length === 0) return;

  tagStack.toReversed().forEach((tag, tagIndex) => {
    const paragraphNode = tag.node.children[0];
    if (!paragraphNode || paragraphNode.type !== 'paragraph') return;
    const textNode = paragraphNode.children[0];
    if (!textNode || textNode.type !== 'text') return;

    const colon = ':'.repeat(tagIndex + 3);

    textNode.value = replaceStartTag(textNode, colon);

    const restNode = tag.node.children.slice(1, tag.node.children.length);
    if (restNode.length === 0) {
      textNode.value = textNode.value + `\n${colon}`;
    } else {
      const lastNode = restNode[restNode.length - 1];
      if (lastNode?.type === 'paragraph') {
        const lastTextNode = lastNode.children[0];
        if (lastTextNode?.type === 'text') {
          lastTextNode.value = lastTextNode.value + `\n${colon}`;
        }
      } else {
        restNode.push({ type: 'paragraph', children: [{ type: 'text', value: colon }] });
      }
    }

    tag.parent.children = [
      ...tag.parent.children.slice(0, tag.index),
      {
        type: 'paragraph',
        children: [textNode],
      },
      ...restNode,
      ...tag.parent.children.slice(tag.index + 1, tag.parent.children.length),
    ];
  });
};

function gfmToZenn() {
  const replaceStartTag = (textNode: Text, colon: string): string => {
    return textNode.value
      .replace(/^\s*\[!(NOTE|TIP|IMPORTANT)\]\s*$/gm, `${colon}message`)
      .replace(/^\s*\[!(WARNING|CAUTION)\]\s*$/gm, `${colon}message alert`);
  };

  return (tree: Root) => {
    visit(tree, 'blockquote', (node: Blockquote, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || index === undefined) return;
      if (parent.type === 'code') return;

      replaceGfmAlert({ node, index, parent, replaceStartTag });
    });
  };
}

function gfmToQiita() {
  const replaceStartTag = (textNode: Text, colon: string): string => {
    return textNode.value
      .replace(/^\s*\[!(NOTE|TIP|IMPORTANT)\]\s*$/gm, `${colon}note info`)
      .replace(/^\s*\[!WARNING\]\s*$/gm, `${colon}note warn`)
      .replace(/^\s*\[!CAUTION\]\s*$/gm, `${colon}note alert`);
  };

  return (tree: Root) => {
    visit(tree, 'blockquote', (node: Blockquote, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || index === undefined) return;
      if (parent.type === 'code') return;

      replaceGfmAlert({ node, index, parent, replaceStartTag });
    });
  };
}

const replaceColonEndTag = (props: {
  index: number;
  parent: Parent;
  tagStack: { index: number; colon: string }[];
}): { index: number; colon: string }[] => {
  const { index, parent, tagStack } = props;

  // 終了タグの置換 (ネスト対応のため最新で置換した開始タグのコロンの数に合うタグを置換する)
  tagStack.sort((a, b) => b.colon.length - a.colon.length);
  tagStack.toReversed().map((tag) => {
    let endTagNode = parent.children[index]!;
    if (endTagNode.type === 'blockquote') {
      endTagNode = endTagNode.children[0]!;
    }
    if (endTagNode.type === 'paragraph') {
      endTagNode = endTagNode.children[0]!;
    }
    if (endTagNode.type !== 'text') return;

    const regex = new RegExp(`\n*^\n*${tag.colon}\n*$`, 'gm');
    const match = endTagNode.value.match(regex);
    if (match) {
      endTagNode.value = endTagNode.value.replace(regex, '');
      parent.children = [
        ...parent.children.slice(0, tag.index),
        {
          type: 'blockquote',
          children: [
            ...(parent.children.slice(
              tag.index,
              endTagNode.value !== '' ? index + 1 : index,
            ) as BlockContent[]),
          ],
        },
        ...parent.children.slice(index + 1),
      ];

      tagStack.pop();
    }
  });

  return tagStack;
};

function zennToGfm() {
  return (tree: Root) => {
    let tagStack: { index: number; colon: string }[] = [];
    visit(tree, 'paragraph', (node: Paragraph, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || index === undefined) return;
      if (parent.type === 'code') return;

      const textNode = node.children[0];
      if (!textNode || textNode.type !== 'text') return;

      // 開始タグの置換 (ネスト対応のため開始タグのコロン部分を保持する)
      textNode.value = textNode.value
        .replace(/^(:{3,})\s*message alert\s*$/gm, (_, colon: string) => {
          tagStack.push({ index, colon });
          return `[!CAUTION]`;
        })
        .replace(/^(:{3,})\s*message\s*$/gm, (_, colon: string) => {
          tagStack.push({ index, colon });
          return `[!NOTE]`;
        });

      const prevLength = parent.children.length;
      tagStack = replaceColonEndTag({ index, parent, tagStack });

      // parent.childrenの長さ変更対応
      return index + 1 - (prevLength - parent.children.length);
    });
  };
}

function qiitaToGfm() {
  return (tree: Root) => {
    let tagStack: { index: number; colon: string }[] = [];
    visit(tree, 'paragraph', (node: Paragraph, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || index === undefined) return;
      if (parent.type === 'code') return;

      const textNode = node.children[0];
      if (!textNode || textNode.type !== 'text') return;

      // 開始タグの置換 (ネスト対応のため開始タグのコロン部分を保持する)
      textNode.value = textNode.value
        .replace(/^(:{3,})\s*note alert\s*$/gm, (_, colon: string) => {
          tagStack.push({ index, colon });
          return `[!CAUTION]`;
        })
        .replace(/^(:{3,})\s*note warn\s*$/gm, (_, colon: string) => {
          tagStack.push({ index, colon });
          return `[!WARNING]`;
        })
        .replace(/^(:{3,})\s*note info\s*$/gm, (_, colon: string) => {
          tagStack.push({ index, colon });
          return `[!NOTE]`;
        });

      const prevLength = parent.children.length;
      tagStack = replaceColonEndTag({ index, parent, tagStack });

      // parent.childrenの長さ変更対応
      return index + 1 - (prevLength - parent.children.length);
    });
  };
}

const remarkAlert: Plugin<[PluginOptions], Root> = (options: PluginOptions) => {
  const { from, to } = options;
  if (from === 'gfm' && to === 'zenn') {
    return gfmToZenn();
  } else if (from === 'zenn' && to === 'gfm') {
    return zennToGfm();
  } else if (from === 'gfm' && to === 'qiita') {
    return gfmToQiita();
  } else if (from === 'qiita' && to === 'gfm') {
    return qiitaToGfm();
  } else if (from === 'zenn' && to === 'qiita') {
    return (tree) => {
      zennToGfm()(tree);
      gfmToQiita()(tree);
    };
  } else if (from === 'qiita' && to === 'zenn') {
    return (tree) => {
      qiitaToGfm()(tree);
      gfmToZenn()(tree);
    };
  }

  console.error(`Not supported: from = ${from}, to = ${to}`);
  return;
};

export default remarkAlert;
