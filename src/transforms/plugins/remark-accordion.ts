import type { Html, Paragraph, Parent, Root, Text } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { PluginOptions } from '../../types/transform.js';

// <details>, <summary>, </summary>間のいずれかに空白行がある場合はだめ
function gfmToZenn() {
  return (tree: Root) => {
    let maxNestLevel = 0;
    const tagStack: { node: Html; index: number; parent: Parent; title: string; content: string }[] = [];
    visit(tree, 'html', (node: Html, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || index === undefined) return;
      if (parent.type === 'code') return;

      // ネスト対応のため開始タグの情報を保持する
      [...node.value.matchAll(/^<details>\s*<summary>\s*(.+)\s*<\/summary>(.*)$/gm)].map((m) => {
        tagStack.push({ node, index, parent, title: m[1] ?? '', content: m[2] ?? '' });
        maxNestLevel++;
      });

      if (tagStack.length === 0) {
        maxNestLevel = 0;
        return;
      }

      [...node.value.matchAll(/^<\/details>$/gm)].map(() => {
        const startTag = tagStack.toReversed()[0]!;
        const title = startTag.title;
        const content = startTag.content;
        const colon = ':'.repeat(maxNestLevel - tagStack.length + 3);

        // 開始タグと終了タグを含むノードが同一の場合
        if (startTag.node === node) {
          let startTagNode = startTag.parent.children[startTag.index]!;
          if (startTagNode.type === 'paragraph') {
            startTagNode = startTagNode.children[0]!;
          }
          // 開始終了タグの置換
          startTag.parent.children[startTag.index] = {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                value: (startTagNode as Text).value
                  .replace(
                    /<details>\s*<summary>\s*.+\s*<\/summary>.*(?![\s\S]*<details>\s*<summary>\s*.+\s*<\/summary>.*)/,
                    `${colon}details ${title}${content ? `\n${content}` : ''}`,
                  )
                  .replace(/^<\/details>$/m, colon),
              },
            ],
          };
        }
        // 開始タグと終了タグを含むノードが分かれているの場合
        else {
          let startTagNode = startTag.parent.children[startTag.index]!;
          let endTagNode = parent.children[index]!;
          if (startTagNode.type === 'paragraph') {
            startTagNode = startTagNode.children[0]!;
          }
          if (endTagNode.type === 'paragraph') {
            endTagNode = endTagNode.children[0]!;
          }

          // 開始タグの置換
          startTag.parent.children[startTag.index] = {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                value: (startTagNode as Text).value.replace(
                  /^<details>\s*<summary>\s*.+\s*<\/summary>.*$/m,
                  `${colon}details ${title}${content ? `\n${content}` : ''}`,
                ),
              },
            ],
          };
          // 終了タグの置換
          parent.children[index] = {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                value: (endTagNode as Text).value.replace(/^<\/details>$/m, colon),
              },
            ],
          };
        }
        tagStack.pop();
      });

      if (tagStack.length === 0) maxNestLevel = 0;
    });
  };
}

function zennToGfm() {
  return (tree: Root) => {
    const tagStack: { colon: string }[] = [];
    visit(tree, 'paragraph', (node: Paragraph, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || index === undefined) return;
      if (parent.type === 'code') return;

      const textNode = node.children[0];
      if (!textNode || textNode.type !== 'text') return;

      let isChanged = false;

      // 開始タグの置換 (ネスト対応のため開始タグのコロン部分を保持する)
      let value = textNode.value.replace(
        /^(:{3,})\s*details\s+(.+)$/gm,
        (_, colon: string, title: string) => {
          tagStack.push({ colon });
          isChanged = true;
          return `<details>\n<summary>${title.trim()}</summary>`;
        },
      );

      // 終了タグの置換 (ネスト対応のため最新で置換した開始タグのコロンの数に合うタグを置換する)
      tagStack.toReversed().map((tag) => {
        const regex = new RegExp(`^${tag.colon}$`, 'gm');
        value = value.replace(regex, () => {
          tagStack.pop();
          isChanged = true;
          return '</details>';
        });
      });

      if (isChanged) {
        parent.children[index] = {
          type: 'html',
          value,
        };
      }
    });
  };
}

const remarkAccordion: Plugin<[PluginOptions], Root> = (options: PluginOptions) => {
  const { from, to } = options;
  if (from === 'gfm' && to === 'zenn') {
    return gfmToZenn();
  } else if (from === 'zenn' && to === 'gfm') {
    return zennToGfm();
  } else if (from === 'gfm' && to === 'qiita') {
    console.log(`No differences in the Markdown syntax: from = ${from}, to = ${to}`);
  } else if (from === 'qiita' && to === 'gfm') {
    console.log(`No differences in the Markdown syntax: from = ${from}, to = ${to}`);
    return;
  } else if (from === 'zenn' && to === 'qiita') {
    return zennToGfm();
  } else if (from === 'qiita' && to === 'zenn') {
    return gfmToZenn();
  }

  console.error(`Not supported: from = ${from}, to = ${to}`);
  return;
};

export default remarkAccordion;
