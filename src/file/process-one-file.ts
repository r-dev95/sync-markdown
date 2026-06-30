import * as fs from 'node:fs/promises';

import { transformer } from '../transforms/transformer.js';
import type { PluginOptions } from '../types/index.js';

export async function processOneFile(srcPath: string, dstPath: string, options: PluginOptions) {
  const content = await fs.readFile(srcPath, 'utf8');
  const transformed = await transformer(content, options);
  await fs.writeFile(dstPath, transformed, 'utf8');
}
