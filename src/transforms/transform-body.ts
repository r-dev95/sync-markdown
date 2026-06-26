import type { Text } from 'mdast';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';

import type { PluginOptions } from '../types/transform.js';
import remarkAccordion from './plugins/remark-accordion.js';
import remarkAlert from './plugins/remark-alert.js';
import remarkCodeDiff from './plugins/remark-code-diff.js';
import remarkEmbed from './plugins/remark-embed.js';
import remarkImage from './plugins/remark-image.js';
import remarkMathPlugin from './plugins/remark-math.js';

export default async function transformBody(source: string, options: PluginOptions): Promise<string> {
  const { from, to } = options;

  if (from === to) {
    throw EvalError('The source and destination are the same.');
  }

  const processor = unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkAccordion, options)
    .use(remarkAlert, options)
    .use(remarkCodeDiff, options)
    .use(remarkEmbed, options)
    .use(remarkImage, options)
    .use(remarkMathPlugin, options)
    .use(remarkStringify, {
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
