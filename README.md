# Playwrightのプロジェクト

Playwrightを使用する例のプロジェクト

## svelteのアプリの実行

リポジトリのgit cloneが完了すると、npmをインストールし、devサーバーを実行
```bash
# 必要のnode modulesをインストール
npm install

# 開発サーバーを実行
npm run dev
```

## Playwrightのテストを実行

```bash
# すべてのテストを実行
npx playwright test

# テストのUIモードを開く
npx playwright test --ui
```