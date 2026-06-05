## 開発環境構築手順

### プロジェクト作成

```bash
npm init -y
```

### パッケージインストール

[**typescript**](https://www.typescriptlang.org/),
[**tsx:**](https://tsx.hirok.io/)

```bash
npm i -D typescript @types/node tsx
```

[**eslint:**](https://eslint.org/)

```bash
npm init @eslint/config@latest
```

```bash
@eslint/create-config: v2.0.0
√ What do you want to lint? · javascript, json, jsonc, json5, md
√ How would you like to use ESLint? · problems
√ What type of modules does your project use? · esm
√ Which framework does your project use? · none
√ Does your project use TypeScript? · No / Yes
√ Where does your code run? · node
√ Which language do you want your configuration file be written in? · js
√ What flavor of Markdown do you want to lint? · gfm
i The config that you've selected requires the following dependencies:

eslint, @eslint/js, globals, typescript-eslint, @eslint/json, @eslint/markdown
√ Would you like to install them now? · No / Yes
√ Which package manager do you want to use? · npm
```

[**eslint-config-prettier:**](https://github.com/prettier/eslint-config-prettier)

- eslintとprettierでルールが重複するため、prettierのルールで上書きする。

```bash
npm i -D eslint-config-prettier
```

[**prettier:**](https://prettier.io/)

```bash
npm i -D prettier
```

[**biome:**](https://biomejs.dev/)

- import ソートのみ使用

```bash
npm i -D @biomejs/biome
npx @biomejs/biome init
```

### コンフィグファイル修正

**package.json:**

```json
...
"scripts": {
    "dev": "tsx src/index.ts",
    "build": "tsc src/index.ts",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "lint:config": "eslint . --inspect-config",
    "format": "prettier . --check",
    "format:fix": "prettier . --write",
    "check": "npm run lint && npm run format",
    "fix": "npm run lint:fix && npm run format:fix",
  },
...
```

**eslint.config.js:**

```js
// @ts-check

import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['**/dist/', 'package-lock.json']),
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.node },
  },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: [json.configs.recommended],
  },
  {
    files: ['**/*.jsonc'],
    plugins: { json },
    language: 'json/jsonc',
    extends: [json.configs.recommended],
  },
  {
    files: ['**/*.json5'],
    plugins: { json },
    language: 'json/json5',
    extends: [json.configs.recommended],
  },
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/gfm',
    extends: [markdown.configs.recommended],
  },
  eslintConfigPrettier,
]);
```

**.prettierrc:**

```json
{
  "arrowParens": "always",
  "bracketSpacing": true,
  "endOfLine": "lf",
  "printWidth": 110,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all"
}
```

**.prettierignore:**

```text
.git
.vscode
node_modules
dist
package-lock.json
```

**biome.json:**

```json
{
  "$schema": "https://biomejs.dev/schemas/2.4.16/schema.json",

  "vcs": {
    "enabled": false,
    "clientKind": "git",
    "useIgnoreFile": true
  },

  "files": {
    "ignoreUnknown": false
  },

  "formatter": {
    "enabled": false
  },

  "linter": {
    "enabled": false
  },

  "assist": {
    "enabled": true,
    "actions": {
      "source": {
        "organizeImports": "on"
      }
    }
  }
}
```
