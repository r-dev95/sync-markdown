## remark-alert (gfm -> zenn/qiita)

### 【成功】ブロック内に">"のみの行なし・あり

:::note info
Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
:::

:::note info
Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
:::

:::note info

Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
:::

:::note warn
Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
:::

:::note alert

Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
:::

### 【失敗】アラート記法 in アラート記法 (ネストしたブロックの後に">"のみの行なし)

::::note info
Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!

:::note warn
Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
:::
::::

### 【成功】アラート記法 in アラート記法 (ネストしたブロックの後に">"のみの行あり)

::::note info
Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!

:::note warn
Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
:::

Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
::::

### 【失敗】アラート記法 in 引用 (ネストしたブロックの後に">"のみの行なし)

> Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
>
> :::note info
> Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
> Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
> :::

### 【成功】アラート記法 in 引用 (ネストしたブロックの後に">"のみの行あり)

> Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
>
> :::note warn
> Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
> :::
>
> Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!

### 【失敗】引用 in アラート記法 (ネストしたブロックの後に">"のみの行なし)

:::note info
Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!

> Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
> Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!

:::

:::note info

> Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
> Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!

:::

### 【成功】引用 in アラート記法 (ネストしたブロックの後に">"のみの行あり)

:::note warn
Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!

> Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!

Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
:::

:::note warn

> Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!

Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
:::

### 【失敗】アラート記法 in アコーディオン (ネストしたブロックの前に空白行なし)

<details>
<summary>詳細</summary>
> [!NOTE]
> Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
</details>

### 【成功】アラート記法 in アコーディオン (ネストしたブロックの前に空白行あり)

<details>
<summary>詳細</summary>

:::note info
Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
:::

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

### 【成功】アラート in コードブロック

```md
> [!NOTE]
> Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere qui debitis laborum aliquam provident neque incidunt alias, quasi, facilis veniam odit. Recusandae sed debitis excepturi beatae incidunt adipisci, totam sit!
```
