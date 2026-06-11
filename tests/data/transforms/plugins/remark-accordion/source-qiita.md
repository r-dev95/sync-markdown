## remark-accordion (qiita -> gfm/zenn)

### 【成功】ブロック内に空白行なし・あり

<details>
<summary>詳細</summary>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
</details>

<details>
<summary>詳細</summary>

Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!

</details>

### 【失敗】<details>から</summary>までの間に空白行

<details>

<summary>

詳細

</summary>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
</details>

### 【成功】アコーディオン in アコーディオン (ネストしたブロックの前後に空白行なし・あり)

<details>
<summary>詳細</summary>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
<details>
<summary>詳細</summary>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
</details>
</details>

<details>
<summary>詳細</summary>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!

<details>
<summary>詳細</summary>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
</details>

</details>

### 【成功】アコーディオン in 引用

> Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
> <details>
> <summary>詳細</summary>
> Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
> </details>
> Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!

### 【成功】引用 in アコーディオン

<details>
<summary>詳細</summary>
> Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
</details>

### 【成功】アコーディオン in アラート記法

:::note info
Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
<details>
<summary>詳細</summary>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
</details>
:::

:::note info
<details>
<summary>詳細</summary>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
</details>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
:::

### 【成功】アラート記法 in アコーディオン

<details>
<summary>詳細</summary>
:::note info
Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
:::
</details>

### 【成功】アコーディオン in コードブロック

```md
<details>
<summary>詳細</summary>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
</details>
```
