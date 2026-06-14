import type { Code, Parent, Root } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { PluginOptions } from '../../types/transform.js';

function gfmToQiita() {
  return (tree: Root) => {
    visit(tree, 'code', (node: Code, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || index === undefined) return;

      node.lang = node.lang?.replace(/^diff\s*$/gm, () => {
        const value = node.meta ? `diff_${node.meta.replace(' ', '')}` : `diff`;
        node.meta = null;
        return value;
      });
    });
  };
}

function qiitaToGfm() {
  return (tree: Root) => {
    visit(tree, 'code', (node: Code, index: number | undefined, parent: Parent | undefined) => {
      if (!parent || index === undefined) return;

      node.lang = node.lang?.replace(/^diff_(.+)$/gm, (_, meta) => {
        node.meta = `${meta}${node.meta ?? ''}`;
        return 'diff';
      });
    });
  };
}

const remarkCodeDiff: Plugin<[PluginOptions], Root> = (options: PluginOptions) => {
  const { from, to } = options;
  if (from === 'gfm' && to === 'zenn') {
    console.log(`No differences in the Markdown syntax: from = ${from}, to = ${to}`);
  } else if (from === 'zenn' && to === 'gfm') {
    console.log(`No differences in the Markdown syntax: from = ${from}, to = ${to}`);
  } else if (from === 'gfm' && to === 'qiita') {
    return gfmToQiita();
  } else if (from === 'qiita' && to === 'gfm') {
    return qiitaToGfm();
  } else if (from === 'zenn' && to === 'qiita') {
    return gfmToQiita();
  } else if (from === 'qiita' && to === 'zenn') {
    return qiitaToGfm();
  }

  console.error(`Not supported: from = ${from}, to = ${to}`);
  return;
};

export default remarkCodeDiff;
