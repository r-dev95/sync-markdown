import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { expect, test } from 'vitest';

import { main } from '../../src/index.js';

test('単一ファイルを別出力へ書き出せる', async () => {
  const workspace = await mkdtemp(path.join(os.tmpdir(), 'sync-markdown-'));
  const inputPath = path.join(workspace, 'note.md');
  await writeFile(inputPath, '# title\n\nbody\n', 'utf8');

  await main(['--from', 'gfm', '--to', 'zenn', 'note.md'], { cwd: workspace });

  const outputPath = path.join(workspace, 'out', 'note.md');
  const output = await readFile(outputPath, 'utf8');

  expect(output).toBe('\n# title\n\nbody\n');
});
