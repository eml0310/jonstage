# JonStage

## Yoroduwemaki (万絵巻) Official Website

JonStageは、関西大学演劇サークル劇団万絵巻 (Yoroduwemaki)
の公式ウェブサイトプロジェクトです。2006年から蓄積されてきた劇団員日記・過去公演情報など、劇団万絵巻のほぼすべての記録を収めています。

## 目次

- [技術スタック](#技術スタック)
- [プロジェクト構造](#プロジェクト構造)
- [コンテンツ構造](#コンテンツ構造)
- [コマンド一覧](#コマンド一覧)
- [貢献](#貢献)
- [謝辞](#謝辞)

## 技術スタック

| 役割           | 技術                             |
|----------------|----------------------------------|
| フレームワーク | [Astro](https://astro.build)     |
| UI             | [AsagaoUI](https://asagaoui.com) |

軽量・高速・メンテナンスしやすい構成を目指して設計しています。

## プロジェクト構造

```text
jonstage/
├── LICENSE
├── README.md
├── astro.config.mjs
├── contents
│   ├── feature/           # 特集記事
│   ├── diary/          # 劇団員日記
│   ├── performances/   # 公演情報
│   └── summer/         # 夏公演（チーム制）
├── package.json
├── public/
├── src
│   ├── assets
│   ├── components
│   ├── content.config.ts
│   ├── layouts
│   └── pages
└── tsconfig.json
```

## コンテンツ構造

> [!IMPORTANT]
> コンテンツは **年度単位ではなく、実際の年 (カレンダー年)単位**で管理してください。

`contents/` フォルダは次の4種類のコンテンツで構成されています。

| フォルダ        | 内容               |
|-----------------|--------------------|
| `feature/`      | 特集               |
| `diary/`        | 劇団員日記         |
| `performances/` | 公演情報           |
| `summer/`       | 夏公演（チーム制） |

### 特集

> 特集記事のコンテンツ構造は現在作成中です。

### Diary（劇団員日記）

各ファイルに以下のフロントマターを設定してください。

```yaml
---
title: "2025年度新人発表公演終了のお知らせ"
date: 2026-03-15
event_name: "2025年度新人発表公演"
---
```

| フィールド   | 必須 | 説明                                 |
|--------------|:----:|--------------------------------------|
| `title`      |  ✅  | 日記のタイトル                       |
| `date`       |  ✅  | 投稿日（`YYYY-MM-DD` 形式）          |
| `event_name` |  —   | 関連する公演名（カテゴリとして使用） |

### Performances（公演情報）

各ファイルに以下のフロントマターを設定してください。

```yaml
---
name: "公演のタイトル"
startDate: 2019-07-01
endDate: 2019-07-26
category: "2006年度秋公演"
venue:
  name: "劇場名"
  address: "東京都渋谷区..."
playwright: "劇作家（脚本家）"
director: "演出"
excerpt: "この公演のあらすじや説明"
flyer:
  front: "./poster-front.jpg"
  back: "./poster-back.jpg"
thumbnail: "./hero.avif"
offers:
  - label: "前売り一般"
    price: 1500
  - label: "当日一般"
    price: 2000
  - label: "学生"
    price: 1000
  - label: "無料"
    price: 0
---
```

| フィールド      | 必須 | 説明                                                                           |
|-----------------|:----:|--------------------------------------------------------------------------------|
| `name`          |  ✅  | 公演名                                                                         |
| `startDate`     |  ✅  | 公演開始日（`YYYY-MM-DD` 形式）                                                |
| `endDate`       |  —   | 公演終了日（`YYYY-MM-DD` 形式）                                                |
| `venue.name`    |  —   | 会場名                                                                         |
| `venue.address` |  —   | 会場住所                                                                       |
| `playwright`    |  —   | 作家・脚本家名                                                                 |
| `director`      |  —   | 演出名                                                                         |
| `excerpt`       |  —   | あらすじ・紹介文                                                               |
| `flyer.front`   |  —   | ビラ表面の画像パス                                                             |
| `flyer.back`    |  —   | ビラ裏面の画像パス                                                             |
| `thumbnail`     |  —   | サムネイル画像パス                                                             |
| `offers`        |  —   | 料金情報（配列）。`label` にチケット種別、`price` に金額（円・数字のみ）を入力 |

### Summer（夏公演/チーム制）

夏公演はチームごとにディレクトリを作成し、チーム基本情報と活動記録（日記）の2段階で構成します。
ファイルパスは `contents/summer/[年]/[チームID]/` となります。

#### チーム基本情報 (`index.md`)

`contents/summer/[年]/[チームID]/index.md` に以下のフロントマターを設定してください。

```yaml
---
name: "チーム名"
year: 2026
director: "演出者名"
twitter: "https://x.com/..."
instagram: "https://www.instagram.com/..."
thumbnail: "./hero.avif"
---
```

| フィールド  | 必須 | 説明               |
|-------------|:----:|--------------------|
| `name`      |  ✅  | チーム名           |
| `year`      |  ✅  | 実施年（西暦数字） |
| `director`  |  —   | 演出者名           |
| `twitter`   |  —   | Twitter (X) のURL  |
| `instagram` |  —   | Instagram のURL    |
| `thumbnail` |  —   | サムネイル画像パス |

#### 活動記録（日記）

`contents/summer/[年]/[チームID]/[YYYY-MM-DD]/index.md` に以下のフロントマターを設定してください。

```yaml
---
title: "活動記録のタイトル"
date: 2026-08-01
---
```

| フィールド | 必須 | 説明                        |
|------------|:----:|-----------------------------|
| `title`    |  ✅  | 記事のタイトル              |
| `date`     |  ✅  | 投稿日（`YYYY-MM-DD` 形式） |

## コマンド一覧

すべてのコマンドは、 **プロジェクトのルートディレクトリ**で実行してください。

| コマンド                  | 処理内容                                                   |
|---------------------------|------------------------------------------------------------|
| `npm install`             | 依存関係をインストール                                     |
| `npm run dev`             | `localhost:4321` でローカル開発サーバーを起動              |
| `npm run build`           | `./dist/` に本番用サイトをビルド                           |
| `npm run preview`         | デプロイ前にビルド結果をローカルでプレビュー               |
| `npm run astro ...`       | `astro add`・`astro check` などの Astro CLI コマンドを実行 |
| `npm run astro -- --help` | Astro CLI のヘルプを表示                                   |

## 貢献

JonStageは、劇団員・OB/OG・関係者の手によって開発されています。  
改善案・バグ修正・新機能の提案はいつでも歓迎します。お気軽にどうぞ。

## 謝辞

プロジェクトの最初のインスピレーションを提供した **Jon**、開発メンバー、そして劇団万絵巻団員一同に感謝します。

© 1994 Yoroduwemaki / Designed & Developed by Hiroshi ISOBE.
