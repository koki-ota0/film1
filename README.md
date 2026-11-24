# CineCard (film1)

映画の「好き」を1枚の画像にする、X投稿向けテンプレ作成ツール集。  
`1日1アプリ` を小さく回せるように、静的サイト + 生成スクリプトで構成しています。

## 収録アプリ

- **好きな映画9選** (`site/top9/`) - 9本の映画ポスターを並べたシェア画像を作成
- **映画ティア表メーカー** (`site/tier/`) - SS〜Dで映画をランク付けして画像書き出し
- **映画ランキングカード** (`site/ranking/`) - 今月/今年のベスト映画ランキングをカード化

## 仕組み

- `apps.json` - サイト設定とアプリ一覧の元データ
- `site/<slug>/index.html` - 各アプリ本体（自己完結HTML）
- `tools/build.js` - `dist/` にサイト全体を生成
- `tools/check.js` - 公開前チェック
- `tools/dev.js` - ローカル確認用サーバー
- `.github/workflows/deploy.yml` - GitHub Pagesへ自動デプロイ

## ローカル開発

```bash
npm run dev      # buildして http://localhost:5173 で配信
npm run build    # dist/ を生成
npm run check    # 生成物チェック
```

## 新しいアプリを追加する

```bash
npm run new -- my-app "アプリ名" "キャッチコピー"
# -> site/my-app/index.html と apps.json の雛形が作られる
# 実装後:
npm run build && npm run check
```

`apps.json` の `status` を `published` にすると、トップ/一覧/詳細ページ/サイトマップに反映されます。

## デプロイ（GitHub Pages）

1. GitHub リポジトリの **Settings → Pages → Source** を **GitHub Actions** に設定。
2. `main` に push すると `.github/workflows/deploy.yml` が `build` → `check` → Pages デプロイを実行。
3. 公開URLは `apps.json` の `site.baseUrl` に合わせる（独自ドメインの場合はここも更新）。

## 1日1アプリの回し方

1. `apps.json` を見て、今日のテンプレ案を1つ決める（所要1〜3時間で作れる粒度）。
2. `npm run new -- <slug> ...` で雛形作成。
3. `site/<slug>/index.html` を実装（モバイル優先、画像書き出し、Xシェア導線）。
4. `npm run build && npm run check`。
5. push → 自動デプロイ → Xで投稿して反応を見る。
6. 反応が良かった型は、別テーマ/別切り口で次のアプリにする。

## 調査メモ

- `docs/RESEARCH.md` - 参考アカウント調査、映画Xテンプレ調査、実装方針
