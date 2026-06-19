import type { Code, Paragraph, Parent, Root } from 'mdast';
import type { InlineMath, Math } from 'mdast-util-math';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { PluginOptions } from '../../types/transform.js';

function gfmToZenn() {
  return (tree: Root) => {
    visit(tree, 'inlineMath', (node: InlineMath, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || index === undefined) return;
      if (parent.type === 'code') return;

      node.value = node.value.replace(/^`(.+)`$/gm, (_, content) => {
        return content;
      });
    });

    visit(tree, 'code', (node: Code, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || index === undefined) return;
      if (parent.type === 'code') return;

      if (node.lang !== 'math') return;

      parent.children[index] = {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: '$$\n' + node.value.trim() + '\n$$',
          },
        ],
      };
    });
  };
}

function zennToGfm() {
  return (tree: Root) => {
    visit(tree, 'inlineMath', (node: InlineMath, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || index === undefined) return;
      if (parent.type === 'code') return;

      if (!node.value.match(/^`.+`$/gm)) {
        node.value = '`' + node.value + '`';
      }
    });

    visit(tree, 'math', (node: Math, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || index === undefined) return;
      if (parent.type === 'code') return;

      parent.children[index] = {
        type: 'code',
        lang: 'math',
        value: node.value,
      };
    });
  };
}

function gfmToQiita() {
  return (tree: Root) => {
    visit(tree, 'paragraph', (node: Paragraph, index: number | undefined, parent: Parent | undefined) => {
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
