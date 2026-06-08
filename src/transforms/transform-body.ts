import type { Root, Text } from 'mdast';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import type { Plugin } from 'unified';
import { unified } from 'unified';

import type { PluginOptions } from '../types/transform.js';

export default async function transformBody(source: string, options: PluginOptions): Promise<string> {
  const { from, to } = options;

  if (from === to) {
    throw EvalError('The source and destination are the same.');
  }

  // TODO: from-to から plugins を設定すること
  const plugins: Plugin<[PluginOptions], Root, Root>[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let processor: any = unified().use(remarkParse);

  for (const plugin of plugins) {
    processor = processor.use(plugin, { options });
  }

  processor = processor.use(remarkStringify, {
    rule: '-',
    bullet: '-',
    fence: '`',
    fences: true,
    incrementListMarker: false,
    handlers: {
      text(node: Text) {
        return node.value; // ← エスケープ処理をすべてスキップ
      },
    },
  });

  return `\n${await processor.process(source)}`;
}
