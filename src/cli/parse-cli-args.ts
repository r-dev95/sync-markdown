export type OutputMode = 'separate' | 'in-place';

export type ParsedCliArgs = {
  from: string;
  inputPaths: string[];
  outputMode: OutputMode;
  outDir: string;
  to: string;
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
    from,
    inputPaths,
    outputMode,
    outDir,
    to,
  };
}
