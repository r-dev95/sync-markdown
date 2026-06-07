import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { parseCliArgs } from './cli/parse-cli-args.js';

export type MainOptions = {
  cwd?: string;
};

export async function main(argv: string[] = process.argv.slice(2), options: MainOptions = {}) {
  const cwd = options.cwd ?? process.cwd();
  const parsed = parseCliArgs(argv);
  const inputPath = parsed.inputPaths[0];

  if (!inputPath) {
    throw new Error('入力ファイルが必要です');
  }

  const sourcePath = path.resolve(cwd, inputPath);
  const outputDir = path.resolve(cwd, parsed.outDir);
  const outputPath = path.join(outputDir, path.basename(sourcePath));
  const content = await readFile(sourcePath, 'utf8');

  await mkdir(outputDir, { recursive: true });
  await writeFile(outputPath, content, 'utf8');
}

const entryPath = process.argv[1];

if (entryPath && import.meta.url === pathToFileURL(entryPath).href) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
