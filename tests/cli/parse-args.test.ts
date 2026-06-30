import { describe, expect, it } from 'vitest';
import { ZodError } from 'zod';
import { parseArgs } from '../../src/cli/parse-args.js';

describe('parseArgs', () => {
  it('parses --file correctly', () => {
    const options = parseArgs(['node', 'cli', '--file', 'input.md', '--from', 'zenn', '--to', 'qiita']);

    expect(options).toEqual({ file: 'input.md', dir: undefined, out: 'out', from: 'zenn', to: 'qiita' });
  });

  it('parses --dir correctly', () => {
    const options = parseArgs([
      'node',
      'cli',
      '--dir',
      'articles',
      '--out',
      'dist',
      '--from',
      'qiita',
      '--to',
      'gfm',
    ]);

    expect(options).toEqual({ file: undefined, dir: 'articles', out: 'dist', from: 'qiita', to: 'gfm' });
  });

  it('uses default out', () => {
    const options = parseArgs(['node', 'cli', '--dir', 'articles', '--from', 'gfm', '--to', 'zenn']);

    expect(options.out).toBe('out');
  });

  it('throws when neither --file nor --dir is specified', () => {
    expect(() => parseArgs(['node', 'cli', '--from', 'zenn', '--to', 'qiita'])).toThrow(ZodError);
  });

  it('throws when both --file and --dir are specified', () => {
    expect(() =>
      parseArgs([
        'node',
        'cli',
        '--file',
        'input.md',
        '--dir',
        'articles',
        '--from',
        'zenn',
        '--to',
        'qiita',
      ]),
    ).toThrow(ZodError);
  });

  it('throws when --from is missing', () => {
    expect(() => parseArgs(['node', 'cli', '--file', 'input.md', '--to', 'qiita'])).toThrow(ZodError);
  });

  it('throws when --to is missing', () => {
    expect(() => parseArgs(['node', 'cli', '--file', 'input.md', '--from', 'zenn'])).toThrow(ZodError);
  });

  it('throws when platform is invalid', () => {
    expect(() =>
      parseArgs(['node', 'cli', '--file', 'input.md', '--from', 'foo', '--to', 'qiita']),
    ).toThrow();
  });
});
