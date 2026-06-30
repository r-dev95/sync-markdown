import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { OptionValues } from 'commander';

export async function getFilePaths(args: OptionValues): Promise<string[]> {
  if (args.file) {
    return [args.file];
  }

  if (args.dir) {
    return await Array.fromAsync(fs.glob(path.posix.join(args.dir, '*.md')));
  }

  return [];
}
