import { expect, test } from 'vitest';
import { transformFrontMatter } from '../../src/transforms/transform-front-matter.js';

test('変換元と変換先のプラットフォーム指定が同じでエラーが投げられる', () => {
  expect(() => transformFrontMatter('', 'zenn', 'zenn')).toThrow(EvalError);
});

test('変換範囲外のプラットフォーム指定で変換元のフロントマターがそのまま返される', () => {
  const source = `---
title: 記事のタイトル
url: https://examle.com
---`;
  expect(transformFrontMatter(source, 'gfm', 'zenn')).toBe(source);
});

test.each([
  {
    msg: '変換元のフロントマターがすべて undefined の場合',
    source: '',
    expected: `---
title: ''
tags: []
private: true
updated_at: ''
id: null
organization_url_name: null
slide: false
ignorePublish: false
---`,
  },
  {
    msg: '変換元のフロントマターがすべて null の場合',
    source: `---
title:
emoji:
type:
topics:
published:
---`,
    expected: `---
title: ''
tags: []
private: true
updated_at: ''
id: null
organization_url_name: null
slide: false
ignorePublish: false
---`,
  },
  {
    msg: '変換元のフロントマターが適切な場合',
    source: `---
title: '記事のタイトル'
emoji: '😸'
type: 'tech' # tech: 技術記事 / idea: アイデア
topics:
  - markdown
  - zenn
published: true
---`,
    expected: `---
title: "\\U0001F638 記事のタイトル"
tags:
  - markdown
  - zenn
private: false
updated_at: ''
id: null
organization_url_name: null
slide: false
ignorePublish: false
---`,
  },
])('%#. フロントマター変換 (Zenn -> Qiita) - $msg', ({ source, expected }) => {
  expect(transformFrontMatter(source, 'zenn', 'qiita')).toBe(expected);
});

test.each([
  {
    msg: '変換元のフロントマターがすべて undefined の場合',
    source: ``,
    expected: `---
title: ''
emoji: ''
type: tech
topics: []
published: false
---`,
  },
  {
    msg: '変換元のフロントマターがすべて null の場合',
    source: `---
title:
tags:
private:
updated_at:
id:
organization_url_name:
slide:
ignorePublish:
---`,
    expected: `---
title: ''
emoji: ''
type: tech
topics: []
published: false
---`,
  },
  {
    msg: '変換元のフロントマターが適切な場合',
    source: `---
title: '記事のタイトル'
tags:
  - markdown
  - qiita
private: false
updated_at: '2025-06-07T09:00:00+09:00'
id: 12345
organization_url_name: 'example'
slide: false
ignorePublish: false
---`,
    expected: `---
title: 記事のタイトル
emoji: ''
type: tech
topics:
  - markdown
  - qiita
published: true
---`,
  },
])('%#. フロントマター変換 (Qiita -> Zenn) - $msg', ({ source, expected }) => {
  expect(transformFrontMatter(source, 'qiita', 'zenn')).toBe(expected);
});
