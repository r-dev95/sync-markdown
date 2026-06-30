import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { pathToFileURL } from 'node:url';

import { parseArgs } from './cli/parse-args.js';
import { getFilePaths } from './file/get-file-paths.js';
import { processOneFile } from './file/process-one-file.js';
import type { PluginOptions } from './types/index.js';

export async function main() {
  const args = parseArgs();

  const srcPaths = await getFilePaths(args);
  if (srcPaths.length === 0) throw new Error('変換元ファイルを指定してください。');

  const dstDir = path.resolve(path.dirname(srcPaths[0]!), args.out);
  await fs.mkdir(dstDir, { recursive: true });

  const options: PluginOptions = { from: args.from, to: args.to };

  const tasks: Promise<void>[] = [];
  srcPaths.forEach((srcPath, index) => {
    const dstPath = path.join(dstDir, path.basename(srcPath));
    tasks.push(processOneFile(srcPath, dstPath, options));
    console.log(`${index} src: ${srcPath}, dst: ${dstPath}`);
  });
  await Promise.all(tasks);
}

const entryPath = process.argv[1];

if (entryPath && import.meta.url === pathToFileURL(entryPath).href) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
