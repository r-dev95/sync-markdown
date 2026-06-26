## transform-body (zenn -> gfm/qiita)

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

---

---

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

これはインライン脚注付きです。^[脚注2]

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

```diff md:title.md
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

$`a = \{1, 2, 3\}`$

$`{a}_{i} + {b}_{i}`$

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

> 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト
>
> 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト 長いテキスト

### アラート

> [!NOTE]
> message content
>
> message content message content message content message content message content

> [!CAUTION]
> alert content
>
> alert content alert content alert content alert content alert content

### 埋め込み

https://qiita.com/Qiita/items/c686397e4a0f4f11683d

https://www.youtube.com/watch?v=M7lc1UVf-VE

https://codepen.io/tomoasleep/pen/dJgNLK?default-tab=js,result

https://speakerdeck.com/player/f41af42d719b40529cdd96e393c410e6
