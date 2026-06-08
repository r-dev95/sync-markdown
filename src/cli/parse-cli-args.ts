import type { Platform } from '../types/transform.js';

export type OutputMode = 'separate' | 'in-place';

export type ParsedCliArgs = {
  from: Platform;
  to: Platform;
  inputPaths: string[];
  outDir: string;
  outputMode: OutputMode;
};

export function parseCliArgs(argv: string[]): ParsedCliArgs {
  let from = '';
  let to = '';
  let outDir = 'out';
  let outputMode: OutputMode = 'separate';
  const inputPaths: string[] = [];

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];

    if (token === undefined) {
      break;
    }

    if (token === '--from') {
      from = argv[index + 1] ?? '';
      index += 1;
      continue;
    }

    if (token === '--to') {
      to = argv[index + 1] ?? '';
      index += 1;
      continue;
    }

    if (token === '--in-place') {
      outputMode = 'in-place';
      continue;
    }

    if (token === '--out-dir') {
      outDir = argv[index + 1] ?? 'out';
      index += 1;
      continue;
    }

    if (token.startsWith('--')) {
      continue;
    }

    inputPaths.push(token);
  }

  return {
    from: from as Platform,
    to: to as Platform,
    inputPaths,
    outDir,
    outputMode,
  };
}
