import * as fs from 'node:fs/promises';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getFilePaths } from '../../src/file/get-file-paths.js';

vi.mock('node:fs/promises', async () => {
  const actual = await vi.importActual<typeof import('node:fs/promises')>('node:fs/promises');

  return {
    ...actual,
    glob: vi.fn(),
  };
});

describe('getFilePaths', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns file when --file is specified', async () => {
    await expect(getFilePaths({ file: 'a.md' })).resolves.toEqual(['a.md']);
  });

  it('returns markdown files when --dir is specified', async () => {
    vi.mocked(fs.glob).mockReturnValue(
      (async function* (): AsyncGenerator<string, undefined> {
        yield 'articles/a.md';
        yield 'articles/b.md';
        return undefined;
      })(),
    );

    await expect(getFilePaths({ dir: 'articles' })).resolves.toEqual(['articles/a.md', 'articles/b.md']);
  });

  it('returns empty array', async () => {
    await expect(getFilePaths({})).resolves.toEqual([]);
  });
});
