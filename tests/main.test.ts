import * as fs from 'node:fs/promises';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { parseArgs } from '../src/cli/parse-args.js';
import { getFilePaths } from '../src/file/get-file-paths.js';
import { processOneFile } from '../src/file/process-one-file.js';
import { main } from '../src/main.js';

vi.mock('../src/cli/parse-args.js', () => ({
  parseArgs: vi.fn(),
}));

vi.mock('../src/file/get-file-paths.js', () => ({
  getFilePaths: vi.fn(),
}));

vi.mock('../src/file/process-one-file.js', () => ({
  processOneFile: vi.fn(),
}));

vi.mock('node:fs/promises', async () => {
  const actual = await vi.importActual<typeof import('node:fs/promises')>('node:fs/promises');

  return {
    ...actual,
    mkdir: vi.fn(),
  };
});

describe('main', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const options = { from: 'zenn', to: 'qiita' };

  it('processes all files', async () => {
    vi.mocked(parseArgs).mockReturnValue({ dir: 'src', out: 'out', from: 'zenn', to: 'qiita' });
    vi.mocked(getFilePaths).mockResolvedValue(['src/a.md', 'src/b.md']);
    vi.mocked(fs.mkdir).mockResolvedValue(undefined);
    vi.mocked(processOneFile).mockResolvedValue();

    await main();
    expect(fs.mkdir).toHaveBeenCalled();
    expect(processOneFile).toHaveBeenCalledTimes(2);
    expect(processOneFile).toHaveBeenNthCalledWith(1, 'src/a.md', expect.stringContaining('a.md'), options);
    expect(processOneFile).toHaveBeenNthCalledWith(2, 'src/b.md', expect.stringContaining('b.md'), options);
  });

  it('throws when no files exist', async () => {
    vi.mocked(parseArgs).mockReturnValue({ file: '', out: 'out', from: 'zenn', to: 'qiita' });
    vi.mocked(getFilePaths).mockResolvedValue([]);

    await expect(main()).rejects.toThrow('変換元ファイルを指定してください。');
  });
});
