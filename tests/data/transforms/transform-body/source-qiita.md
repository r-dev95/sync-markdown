## transform-body (qiita -> gfm/zenn)

### 見出し

# 見出し1

## 見出し2

### 見出し3

#### 見出し4

##### 見出し5

###### 見出し6

####### 見出し7

### インライン

`inline code`、**強調**、*斜体*、***強調斜線***、~~打ち消し線~~

### リスト

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

### チェックボックス

- [x] 短いテキスト
- [ ] 短いテキスト
- [x] 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト

### 区切り線

---

***

___

### 表

| 項目 | 内容 | 備考 |
| --- | --- | --- |
| 短いテキスト | 短いテキスト | 短いテキスト |
| 短いテキスト | 短いテキスト | 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト |
| 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト | 短いテキスト | 短いテキスト |

### リンク

https://example.com/

[リンク](https://example.com/)

### 画像

![代替テキスト](https://placehold.jp/150x150.png "title")

[![代替テキスト](https://placehold.jp/150x150.png "title")](#画像)

### 脚注

これは脚注付きです。[^1]

[^1]: https://example.com

### コードブロック

```md:title.md
# title

Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis delectus dolores cum doloremque ipsa ducimus quos, quam molestias id sit fugiat deleniti, blanditiis deserunt commodi nihil qui provident dolorum dicta?

## heading2

- list1
- list2
  - list2-1
  - list2-2
```

```diff_md:title.md
# title

- Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis delectus dolores cum doloremque ipsa ducimus quos, quam molestias id sit fugiat deleniti, blanditiis deserunt commodi nihil qui provident dolorum dicta?

  ## heading2

  - list1
  - list2
    - list2-1
-   - list2-2
+ - list3
```

### 数式

$a = \\{1, 2, 3\\}$

${a}\_{i} + {b}\_{i}$

$`a = \{1, 2, 3\}`$

$`{a}_{i} + {b}_{i}`$

$$
\begin{aligned}
a = \\{1, 2, 3\\}\\\\
{a}\_{i} + {b}\_{i}
\end{aligned}
$$

```math
\begin{aligned}
a = \{1, 2, 3\}\\
{a}_{i} + {b}_{i}
\end{aligned}
```

### アコーディオン

<details>
<summary>詳細</summary>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
</details>

### 引用

> 短いテキスト
>
>

> 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト
>
> 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト
>
>

### アラート

:::note info
info content

info content info content info content info content info content
:::

:::note warn
warn content

warn content warn content warn content warn content warn content
:::

:::note alert
alert content

alert content alert content alert content alert content alert content
:::

### 埋め込み

<iframe width="560" height="315" src="https://www.youtube.com/embed/M7lc1UVf-VE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" loading="lazy" allowfullscreen></iframe>

<p data-height="265" data-theme-id="0" data-slug-hash="dJgNLK" data-default-tab="js,result" data-user="tomoasleep" data-embed-version="2" data-pen-title="dJgNLK" class="codepen">See the Pen <a href="https://codepen.io/tomoasleep/pen/dJgNLK/">dJgNLK</a> by Tomoya Chiba (<a href="https://codepen.io/tomoasleep">@tomoasleep</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
