import { readFile } from 'node:fs/promises';
import { expect, test } from 'vitest';
import transformBody from '../../src/transforms/transform-body.js';
import { Platform } from '../../src/types/transform.js';

test('変換元と変換先のプラットフォーム指定が同じでエラーが投げられる', async () => {
  await expect(() => transformBody('', { from: 'zenn', to: 'zenn' })).rejects.toThrow(EvalError);
});

test.each([
  {
    msg: 'GFM -> Zenn',
    from: 'gfm',
    to: 'zenn',
    source: './tests/data/transforms/transform-body/source-gfm.md',
    expected: './tests/data/transforms/transform-body/expected-gfm-to-zenn.md',
  },
  {
    msg: 'Zenn -> GFM',
    from: 'zenn',
    to: 'gfm',
    source: './tests/data/transforms/transform-body/source-zenn.md',
    expected: './tests/data/transforms/transform-body/expected-zenn-to-gfm.md',
  },
  {
    msg: 'GFM -> Qiita',
    from: 'gfm',
    to: 'qiita',
    source: './tests/data/transforms/transform-body/source-gfm.md',
    expected: './tests/data/transforms/transform-body/expected-gfm-to-qiita.md',
  },
  {
    msg: 'Qiita -> GFM',
    from: 'qiita',
    to: 'gfm',
    source: './tests/data/transforms/transform-body/source-qiita.md',
    expected: './tests/data/transforms/transform-body/expected-qiita-to-gfm.md',
  },
  {
    msg: 'Zenn -> Qiita',
    from: 'zenn',
    to: 'qiita',
    source: './tests/data/transforms/transform-body/source-zenn.md',
    expected: './tests/data/transforms/transform-body/expected-zenn-to-qiita.md',
  },
  {
    msg: 'Qiita -> Zenn',
    from: 'qiita',
    to: 'zenn',
    source: './tests/data/transforms/transform-body/source-qiita.md',
    expected: './tests/data/transforms/transform-body/expected-qiita-to-zenn.md',
  },
])('%#. 本文変換 ($msg)', async ({ from, to, source, expected }) => {
  const options = { from: from as Platform, to: to as Platform };
  expect(`${await transformBody(await readFile(source, 'utf8'), options)}`.trimStart()).toBe(
    await readFile(expected, 'utf8'),
  );
});
