import { readFile } from 'node:fs/promises';
import matter from 'gray-matter';
import { expect, test } from 'vitest';

import transformBody from '../../src/transforms/transform-body.js';

test('変換元と変換先のプラットフォーム指定が同じでエラーが投げられる', async () => {
  await expect(() => transformBody('', { from: 'zenn', to: 'zenn' })).rejects.toThrow(EvalError);
});

// TODO: プラグインを開発したら置き換える
test('本文変換 (プラグインなし)', async () => {
  const source = matter(await readFile('tests/sample/index.md', 'utf8')).content;
  expect(await transformBody(source, { from: 'zenn', to: 'qiita' })).toBe(source);
});
