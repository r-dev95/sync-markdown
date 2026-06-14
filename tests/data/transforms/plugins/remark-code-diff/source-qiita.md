## remark-code-diff (qiita -> gfm/zenn)

### 【成功】

```diff
  function main() {
    console.log("hello world.");
  }

+ main();
```

```diff_js:main.js
  function main() {
    console.log("hello world.");
  }

- main();
```

### 【成功】コードブロック in コードブロック

````diff_js: main.js
  function main() {
    console.log("hello world.");
  }

- main();

```diff_js:main.js
  function main() {
    console.log("hello world.");
  }

- main();
```

````
