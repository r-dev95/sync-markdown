import * as fs from 'node:fs/promises';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { processOneFile } from '../../src/file/process-one-file.js';
import { transformer } from '../../src/transforms/transformer.js';
import { PluginOptions } from '../../src/types/index.js';

vi.mock('../../src/transforms/transformer.js', () => ({
  transformer: vi.fn(),
}));

vi.mock('node:fs/promises', async () => {
  const actual = await vi.importActual<typeof import('node:fs/promises')>('node:fs/promises');

  return {
    ...actual,
    readFile: vi.fn(),
    writeFile: vi.fn(),
  };
});

describe('processOneFile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const options: PluginOptions = { from: 'zenn', to: 'qiita' };

  it('reads, transforms and writes', async () => {
    vi.mocked(fs.readFile).mockResolvedValue('# title');
    vi.mocked(transformer).mockResolvedValue('# converted');
    vi.mocked(fs.writeFile).mockResolvedValue();

    await processOneFile('src.md', 'dst.md', options);

    expect(fs.readFile).toHaveBeenCalledWith('src.md', 'utf8');
    expect(transformer).toHaveBeenCalledWith('# title', options);
    expect(fs.writeFile).toHaveBeenCalledWith('dst.md', '# converted', 'utf8');
  });

  it('propagates transformer error', async () => {
    vi.mocked(fs.readFile).mockResolvedValue('content');
    vi.mocked(transformer).mockRejectedValue(new Error('failed'));

    await expect(processOneFile('src.md', 'dst.md', options)).rejects.toThrow('failed');
  });
});
