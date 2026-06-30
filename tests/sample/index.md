---
image: ""
title: sample post 1
summary: これはVite と Vanilla JS を用いた静的な個人ブログサイトのサンプルポスト1です。
tags:
  - tag1
  - tag2
createdAt: '2026-04-07T13:55:48.870Z'
---

# サンプルポスト1の概要

本サンプルは、マークダウンをHTMLに変換したときの表示を確認するためのサンプルです。

## 見出し

見出しの表示を確認します。

# 見出し1

## 見出し2

### 見出し3

#### 見出し4

##### 見出し5

###### 見出し6

## インライン要素

`inline code`、**強調**、*斜体*、~~打ち消し線~~、[リンク](https://example.com/) の表示もを確認します。

## リスト

リストの表示を確認します。

- 箇条書きリスト
- 短いテキスト
- 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト
  - ネストした短いテキスト
  - ネストした長いテキスト ネストした長いテキスト ネストした長いテキスト ネストした長いテキスト ネストした長いテキスト

1. 番号付きリスト
1. 短いテキスト
1. 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト
   1. ネストした短いテキスト
   1. ネストした長いテキスト ネストした長いテキスト ネストした長いテキスト ネストした長いテキスト ネストした長いテキスト

## チェックボックス

- [x] 短いテキスト
- [ ] 短いテキスト
- [x] 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト

## 注釈

これは注釈付きです。[^1]

[^1]: https://example.com

## 区切り線

---

## 表

| 項目 | 内容 | 備考 |
| --- | --- | --- |
| 短いテキスト | 短いテキスト | 短いテキスト |
| 短いテキスト | 短いテキスト | 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト |
| 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト | 短いテキスト | 短いテキスト |

## 画像

![ダミー画像の代替テキスト(svg)](./image/sample-image.svg)

![ダミー画像の代替テキスト(png)](./image/sample-image.png)

## コードブロック

```js title="main.js"
function createGreeting(name) {
  return `Hello, ${name}. Hello, ${name}. Hello, ${name}. Hello, ${name}. Hello, ${name}. Hello, ${name}.`;
}

const names = ['Aki', 'Rin', 'Sora'];
names.forEach((name) => {
  console.log(createGreeting(name));
});
```

```css title="style.css"
.section-card {
  padding: 32px 24px;
  border: 1px solid var(--color-line);
  border-radius: 20px;
}
```

```html title="index.html"
<section class="section-card">
  <p class="card-title">Post</p>
  <h2>最新の投稿</h2>
</section>
```

```diff python title="main.py"
+ class Text:
+     def __init__(self, data: str) -> None:
+         self.data = data

  def main():
      print('hello world!')
+     text = Text()

  main()
```

## 単体URL

https://example.com

https://r-dev95.netlify.app/

## 折り畳み

<details>
<summary>詳細</summary>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
</details>

## 引用

引用の表示を確認します。

> 短いテキスト

> 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト
>
> 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト

## アラート

> [!NOTE] title=note title
> note content
>
> note content note content note content note content note content

> [!TIP] title=tip title
>
> tip content
>
> tip content tip content tip content tip content tip content

> [!IMPORTANT] title=important title
> important content
>
> important content important content important content important content important content

> [!WARNING] title=warning title
> warning content
>
> warning content warning content warning content warning content warning content

> [!CAUTION] title=caution title
> caution content
>
> caution content caution content caution content caution content caution content
