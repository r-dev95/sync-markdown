import { readFile } from 'node:fs/promises';
import { Text } from 'mdast';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { expect, test } from 'vitest';
import remarkCodeDiff from '../../../src/transforms/plugins/remark-code-diff.js';
import type { Platform } from '../../../src/types/index.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const remarkSrtingifyOptions: any = {
  rule: '-',
  bullet: '-',
  fence: '`',
  fences: true,
  incrementListMarker: false,
  handlers: {
    text(node: Text) {
      return node.value;
    },
  },
};

test('変換元と変換先のプラットフォーム指定が同じで変換されない', async () => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkCodeDiff, { from: 'zenn', to: 'zenn' })
    .use(remarkStringify, remarkSrtingifyOptions);
  const source = `# heading1

\`\`\`diff js
  function main() {
    console.log("main");
  }

+ main();
\`\`\`
`;
  expect(`${await processor.process(source)}`).toBe(source);
});

test.each([
  {
    msg: 'GFM -> Zenn',
    from: 'gfm',
    to: 'zenn',
    source: './tests/data/transforms/plugins/remark-code-diff/source-gfm.md',
    expected: './tests/data/transforms/plugins/remark-code-diff/expected-gfm-to-zenn.md',
  },
  {
    msg: 'Zenn -> GFM',
    from: 'zenn',
    to: 'gfm',
    source: './tests/data/transforms/plugins/remark-code-diff/source-zenn.md',
    expected: './tests/data/transforms/plugins/remark-code-diff/expected-zenn-to-gfm.md',
  },
  {
    msg: 'GFM -> Qiita',
    from: 'gfm',
    to: 'qiita',
    source: './tests/data/transforms/plugins/remark-code-diff/source-gfm.md',
    expected: './tests/data/transforms/plugins/remark-code-diff/expected-gfm-to-qiita.md',
  },
  {
    msg: 'Qiita -> GFM',
    from: 'qiita',
    to: 'gfm',
    source: './tests/data/transforms/plugins/remark-code-diff/source-qiita.md',
    expected: './tests/data/transforms/plugins/remark-code-diff/expected-qiita-to-gfm.md',
  },
  {
    msg: 'Zenn -> Qiita',
    from: 'zenn',
    to: 'qiita',
    source: './tests/data/transforms/plugins/remark-code-diff/source-zenn.md',
    expected: './tests/data/transforms/plugins/remark-code-diff/expected-zenn-to-qiita.md',
  },
  {
    msg: 'Qiita -> Zenn',
    from: 'qiita',
    to: 'zenn',
    source: './tests/data/transforms/plugins/remark-code-diff/source-qiita.md',
    expected: './tests/data/transforms/plugins/remark-code-diff/expected-qiita-to-zenn.md',
  },
])('%#. 本文変換 ($msg)', async ({ from, to, source, expected }) => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkCodeDiff, { from: from as Platform, to: to as Platform })
    .use(remarkStringify, remarkSrtingifyOptions);
  expect(`${await processor.process(await readFile(source, 'utf8'))}`).toBe(await readFile(expected, 'utf8'));
});
