# shuan1026.com

Mark Tsai 的個人網站與部落格 —— 工程筆記與技術文章。

- 網站：<https://shuan1026.com>
- 原始碼：<https://github.com/shuan1026/shuan1026.github.io>

以 [Astro](https://astro.build) 建置，佈景主題為
[astro-theme-cactus](https://github.com/chrismwilliams/astro-theme-cactus)，
透過 GitHub Actions 部署到 GitHub Pages。

## 本機開發

需要 Node 24（見 `.nvmrc`）與 pnpm。

```bash
pnpm install
pnpm dev                                        # http://localhost:4321
pnpm build && pnpm postbuild && pnpm preview    # 含搜尋索引的正式建置
pnpm check                                      # 型別與 lint
```

兩個開發模式下的預期行為：搜尋在 `pnpm dev` 不會運作（索引由 `postbuild` 產生），
而 `draft: true` 的文章在 `pnpm dev` 看得到、在 `pnpm build` 會被排除。

## 常用路徑

| 路徑 | 用途 |
| --- | --- |
| `content/posts/` | 文章（Markdown） |
| `content/tags/` | 標籤頁的標題與說明，檔名等於標籤 |
| `src/site.config.ts` | 站名、網址、語言、日期格式、選單 |
| `src/styles/global.css` | 顏色與字體 token、基礎排版 |
| `src/pages/` | 路由 |
| `public/` | 原樣複製的靜態檔（`icon.svg`、`social-card.png`、`CNAME`） |
| `.github/workflows/deploy.yml` | 部署流程 |
| `legacy/` | 改版前的 Jekyll 站，僅本機參考（未入版控） |

## 新增文章

在 `content/posts/` 新增 `.md`，檔名（英文）就是網址 slug：

```yaml
---
title: "文章標題"
description: "會用在 meta description 與 RSS 摘要的一兩句話。"
publishDate: "2026-09-05T00:00:00+08:00"
tags: ["devops"]
---
```

`title` 上限 60 字元；`tags` 會被轉成小寫；草稿加 `draft: true`。

## 網址結構

| 類型 | 網址 |
| --- | --- |
| 文章 | `/posts/<slug>/` |
| 文章列表 | `/posts/`（每頁 10 篇） |
| 標籤 | `/tags/<tag>/`、總覽 `/tags/` |
| 其他 | `/about/`、`/404`、`/rss.xml`、`/sitemap-index.xml`、`/robots.txt` |

## 部署

推送到 `main` 會觸發 `.github/workflows/deploy.yml`，用
[`withastro/action`](https://github.com/withastro/action) 建置後由
`actions/deploy-pages` 發布。GitHub Pages 的來源設定為 **GitHub Actions**。

自訂網域是 `shuan1026.com`，`CNAME` 與 `public/CNAME` 都不要刪。

## 授權

本站以 [astro-theme-cactus](https://github.com/chrismwilliams/astro-theme-cactus)（MIT）
為基礎，佈景主題授權見 `LICENSE`。文章內容版權為作者所有。
