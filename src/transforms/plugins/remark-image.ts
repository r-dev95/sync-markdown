import type { Blockquote, Image, Paragraph, Parent, Root, Text } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { PluginOptions } from '../../types/transform.js';

function gfmToZenn() {
  return (tree: Root) => {
    visit(tree, 'image', (node: Image, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || index === undefined) return;
      if (parent.type === 'code') return;

      if (node.title) {
        parent.children.splice(
          index + 1,
          0,
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'emphasis',
            children: [
              {
                type: 'text',
                value: node.title,
              },
            ],
          },
        );
      }
    });
  };
}

function zennToGfm() {
  return (tree: Root) => {
    visit(tree, 'image', (node: Image, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || index === undefined) return;
      if (parent.type === 'code') return;

      for (let i = 1; i < 3; i++) {
        let titleNode = parent.children[index + i];
        if (titleNode?.type === 'emphasis') {
          titleNode = titleNode.children[0];
          if (titleNode?.type === 'text') {
            node.title = titleNode.value;
            if (i === 1) {
              parent.children.splice(index + i, 1);
            } else {
              parent.children.splice(index + i - 1, 2);
            }
            break;
          }
        }
      }
    });

    // 幅サイズ指定記法(=〇〇x)の対応
    visit(tree, 'text', (node: Text, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || index === undefined) return;
      if (parent.type === 'code') return;

      node.value = node.value.replace(
        /^(\n?)!\[(.*)\]\((\S+)\s+(.+)\)\s*\n?$/gm,
        (_, prefix, alt, url, attrs) => {
          const title = attrs.match(/["'](.*)["']/)[1] ?? '';

          for (let i = 1; i < 3; i++) {
            let titleNode = parent.children[index + i];
            if (titleNode?.type === 'emphasis') {
              titleNode = titleNode.children[0];
              if (titleNode?.type === 'text') {
                if (i === 1) {
                  parent.children.splice(index + i, 1);
                } else {
                  parent.children.splice(index + i - 1, 2);
                }
                break;
              }
            }
          }
          return `${prefix}![${alt}](${url} "${title}")`;
        },
      );
    });
  };
}

function gfmToQiita() {
  return (tree: Root) => {
    visit(tree, 'blockquote', (node: Blockquote, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || index === undefined) return;
      if (parent.type === 'code') return;
    });
  };
}

function qiitaToGfm() {
  return (tree: Root) => {
    visit(tree, 'paragraph', (node: Paragraph, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || index === undefined) return;
      if (parent.type === 'code') return;
    });
  };
}

const remarkImage: Plugin<[PluginOptions], Root> = (options: PluginOptions) => {
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

export default remarkImage;
