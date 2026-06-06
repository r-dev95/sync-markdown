import { expect, test } from 'vitest';

import { parseCliArgs } from '../../src/cli/parse-cli-args.js';

test('単一ファイル変換に必要な引数を解析できる', () => {
  const result = parseCliArgs(['--from', 'gfm', '--to', 'zenn', 'article.md']);

  expect(result).toEqual({
    from: 'gfm',
    inputPaths: ['article.md'],
    outputMode: 'separate',
    outDir: 'out',
    to: 'zenn',
  });
});
