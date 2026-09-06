# AGENTS.md

Astro 個人網站，以 [astro-theme-cactus](https://github.com/chrismwilliams/astro-theme-cactus)
v8.2.0（MIT）為基礎，部署於 GitHub Pages（`shuan1026.com`）。本檔是常駐工作規則。

改版前的 Jekyll 站保留在 `legacy/`（**已 gitignore，只在本機**），只作參考，不要在裡面改東西。

## 建置與驗證

```bash
pnpm install
pnpm dev                                        # http://localhost:4321
pnpm build && pnpm postbuild && pnpm preview    # 搜尋索引只有 build 之後才有
pnpm check                                      # astro check + biome check
pnpm lint                                       # biome check --write
pnpm format                                     # prettier -w
pnpm astro sync                                 # 不是 `pnpm sync`，package.json 沒那個腳本
```

幾件容易踩的事：

- **開發模式沒有搜尋。** `src/components/Search.astro` 在 `import.meta.env.DEV` 會提早 return，
  Pagefind 索引是 `postbuild` 產生的。要驗搜尋一定得 `pnpm build && pnpm postbuild && pnpm preview`。
- **開發模式看得到草稿。** `draft: true` 只在 `import.meta.env.PROD` 過濾（見 `src/data/post.ts`），
  所以 `pnpm dev` 會列出草稿，`pnpm build` 不會。
- 改 `astro.config.ts` 或 `src/site.config.ts` 之後 dev server 會自己重啟，不用手動處理。

改完樣式，**最少驗這六個頁面**（桌機 1440 / 平板 768 / 手機 375 各一次）：

| 頁面 | 檢查重點 |
| --- | --- |
| `/` | hero、最新文章列表 |
| `/posts/` | 年度分組、標籤側欄、分頁 |
| `/posts/welcome/` | prose 行寬、程式碼區塊、標題階層、TOC（≥1024px 才出現） |
| `/posts/ui-kitchen-sink/` | 驗收頁（**只有 dev 看得到**）：表格、巢狀清單、`kbd`/`mark`、inline SVG、引言 |
| `/tags/` 與任一標籤頁 | 標籤計數、`content/tags/` 的說明覆寫 |
| `/404` | 錯誤頁 |

深淺兩個主題都要看，且用鍵盤走一遍（Tab / Esc）。主題切換是 `data-theme` + `localStorage`，
不是 `prefers-color-scheme` media query。

## 硬性約束

1. **不可自行 commit。** 版控由使用者親自操作，詳見下方「Git」。
2. **不刪 `CNAME`。** 根目錄那份被 git 追蹤（用自訂 Actions workflow 時 GitHub 會忽略它，
   但它是網域的書面紀錄）；`public/CNAME` 會被複製進 `dist/`。**兩份都不准刪。**
3. **`dist/`、`.astro/`、`node_modules/` 是建置產物**，不要編輯、不要提交（已在 `.gitignore`）。
4. **`package.json` 與 `pnpm-lock.yaml` 一定同一次提交。** CI 跑的 `pnpm install` 因為
   `CI=true` 等同 `--frozen-lockfile`，兩者不同步會直接讓部署失敗。
5. **不要引入 remark / rehype 外掛。** v8.1.0 起 Markdown 管線是 Sätteri，不是 unified，
   第三方 remark/rehype 外掛掛不上去。要擴充就寫在 `src/plugins/satteri.ts`。
6. **不要在 `public/icon.svg` 加 `<style>`、`@media` 或 `<text>`。** 它會被 sharp（librsvg）
   光柵化成 favicon 與 PWA icon：librsvg 會靜默丟掉 `@media` 區塊，`font-family` 走 fontconfig
   解析，`ubuntu-latest` 上的結果跟 macOS 不一樣。顏色用 presentation attribute，字母用 path。
7. **不要重新啟用 `/og-image/` 的 satori 路由**，除非同時加了含漢字的字型。內建的
   Roboto Mono 沒有漢字字形，中文標題會整片豆腐字，而且壞掉的 PNG 會被 `_cacheUtil.ts` 快取。
   目前所有頁面共用 `public/social-card.png`。
8. **加任何第三方相依（npm 套件、web font、外部服務）先問過。**
9. **不做整站視覺重新設計**，除非使用者明確要求。預設策略是「沿用 Cactus 的視覺語言，
   只為中文正確性做必要調整」。

## 上游

佈景主題上游是 `chrismwilliams/astro-theme-cactus`（目前對齊 tag `v8.2.0`）。
動 `src/components/`、`src/layouts/`、`src/pages/` 之前先想合併成本：**能刪整個檔案就不要改一半**，
設定值優先寫在 `src/site.config.ts`，樣式優先寫在 `src/styles/global.css` 與 `tailwind.config.ts`。

已知的上游缺陷（改動相關程式碼時要記得）：

- `FormattedDate` 用 `Intl.DateTimeFormat` 但沒帶 `timeZone`，`groupPostsByYear` 用
  `Date.getFullYear()`。所以 `src/site.config.ts` 必須有 `timeZone: "Asia/Taipei"`，
  workflow 必須有 `TZ: Asia/Taipei`，否則 UTC runner 會把 `+08:00` 的午夜文章印成前一天。
- `satteriHeadingIdsPlugin()` 在 `astro.config.ts` 只被呼叫一次，`new Slugger()` 跨整個 build 共用。
  **兩篇文章有相同標題文字時，第二篇會拿到 `id="前言-1"`。** 用
  `grep -rho 'id="[^"]*"' dist/posts/*/index.html | grep -- '-1"'` 檢查。

## 網址契約

| 類型 | 網址 |
| --- | --- |
| 文章 | `/posts/<slug>/`（slug = `content/posts/` 底下的路徑去掉副檔名） |
| 文章列表 | `/posts/`、`/posts/2/`…（每頁 10 篇） |
| 標籤 | `/tags/<tag>/`、總覽 `/tags/` |
| 其他 | `/about/`、`/404`、`/rss.xml`、`/sitemap-index.xml`、`/robots.txt`、`/manifest.webmanifest` |

規則：

- **每篇文章至少要有一個 tag**，否則不會出現在任何標籤頁。
- **tags 會被 schema 靜默轉小寫並去重**（`content.config.ts`），所以 `/tags/DevOps/` 不存在。
- **`title` 超過 60 個字會讓建置失敗**（`z.string().max(60)`）。
- `content/posts/` 底下的子資料夾會變成網址片段（`[...slug]` 是 rest param），
  `index.md` 會收斂成它所在的資料夾網址 —— 要跟圖片放一起時用這個結構。
- `content/tags/<tag>.md` 的說明只有在真的有文章帶那個 tag 時才會被算進 `/tags/`。
- 檔名的 slug 就是網址，所以**檔名用英文**。

## UI 撰寫規則

### 設計 token

- 顏色一律走 token。元件裡不得出現裸的 hex、`rgba()` 或魔術數字。
- 顏色 token 是 `src/styles/global.css` 裡七個用 `@property` 註冊的 oklch 自訂屬性
  （`--color-global-bg`、`--color-global-text`、`--color-muted`、`--color-link`、
  `--color-accent`、`--color-accent-2`、`--color-quote`）。**必須用 `@property` 註冊**，
  否則主題切換的 300ms 漸變不會動（未註冊的自訂屬性不能 transition）。
- 新增顏色 token 要同時給淺色值（`@theme` 區塊）與深色值（`html[data-theme="dark"]` 區塊），
  兩邊都不能漏。
- 命名採語意化，不用色名。新增前先找現有的，同一個用途不開第二個 token。

### 深色模式

- 機制是 `<html data-theme="light|dark">` + `localStorage["theme"]`，由
  `src/components/ThemeProvider.astro` 的 `is:inline` 阻斷式 script 在 `<head>` 設定（防閃爍）。
  Tailwind 的 variant 是 `@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *))`。
- **不要改用 `prefers-color-scheme` media query 寫樣式** —— 那樣手動切換會失效。
  只有 `<meta name="theme-color">` 這種瀏覽器 UI 才用 media query。

### 無障礙底線（每次改動都要成立）

- 內文與 UI 文字對比 **≥ 4.5:1**，大字（≥24px 或 ≥19px bold）**≥ 3:1**，邊框／圖示 **≥ 3:1**。
  新增或調整顏色時實際算過，不要目測。**深淺兩個主題各算一次。**
- 所有可聚焦元素要有清楚的 `:focus-visible` 樣式，深淺主題各自可見。
  不要用 `outline: none` 而不補樣式。
- 任何 `transition` / `animation` 都要包 `@media (prefers-reduced-motion: reduce)` 的關閉分支。
- 行動版選單收起時不可被 Tab 到；開啟時焦點留在選單內、Esc 關閉並把焦點還給觸發按鈕。
- 互動目標尺寸：**獨立控制項**（按鈕、選單項、卡片）最小 44×44 CSS px。
  **文字行內的連結與標籤**適用 WCAG 2.5.8 的行內例外，維持 ≥24×24 即可 ——
  硬撐到 44px 會破壞行內排版，反而更難讀。
- 語意優先：能用 `<nav>`、`<article>`、`<time>`、`<button>` 就不要 `<div>` + class。

### 版面與排版

- 內容寬度由 `src/layouts/Base.astro` 的 `max-w-3xl` 決定，不要在個別頁面另外加寬度限制。
- 間距與字級用 Tailwind 的比例尺，不要寫 `0.45rem` 這種任意值。
- **正文固定 16px**（`text-base`）。Cactus 原本是 `text-sm` + `prose-sm`，中文 14px 不可讀，
  已刻意改掉 —— 不要改回去。
- 格線一律用 CSS Grid / Flexbox。

### 中文排版

- 字體堆疊維持系統字（`--font-sans` / `--font-mono` 在 `global.css` 的 `@theme`，
  以 `PingFang TC` / `Noto Sans TC` 為 CJK 來源），**不要為了視覺效果掛 web font**。
- 中文正文 `line-height` 不低於 1.7；標題 1.25–1.35。
- 標題加 `text-wrap: balance`，段落加 `text-wrap: pretty`。
- 中英混排時 `word-break` 維持 `normal` + `overflow-wrap: break-word`。
  **不要用 `word-break: break-all`** —— 會把 `kubectl`、`Observability` 從中間切開。

### 檔案分工

| 檔案 | 內容 |
| --- | --- |
| `src/site.config.ts` | 站名、網址、語言、**日期時區**、選單、Expressive Code 設定 |
| `src/styles/global.css` | 顏色 token（`@property` + `@theme`）、字體 token、`@layer base` 的中文排版 |
| `tailwind.config.ts` | 只服務 `@tailwindcss/typography`（`prose` 的細部樣式） |
| `src/plugins/satteri.ts` | Markdown 管線外掛（含中文閱讀時間 300 字/分） |
| `content/posts/` | 文章。front matter：`title` / `description` / `publishDate` / `tags`（`draft` / `updatedDate` / `pinned` 選用） |
| `content/tags/` | 標籤頁的標題與說明覆寫，檔名必須等於小寫 tag |
| `public/` | 原樣複製進 `dist/`：`icon.svg`、`social-card.png`、`CNAME` |
| `.github/workflows/deploy.yml` | 部署 |
| `legacy/` | 改版前的 Jekyll 站，**唯讀參考，已 gitignore** |

## 工作方式

- **一次做一個階段**，做完跑 build、驗頁面、交給使用者提交，再進下一個。
  不要把多個階段混在一次改動裡。
- 改動前先讀現有的程式碼，沿用既有的命名慣例與註解密度，不要引入新風格。
- 動到 `src/layouts/` 或 `src/components/` 的 HTML 結構時，同步確認 `BaseHead.astro`
  產生的 meta 與 JSON-LD 沒被破壞。
- 完成後如實回報：跑了什麼、驗了哪幾頁、哪些沒驗到。

## Git

> **版控由使用者自己做。Codex 不提交。**

- **不執行任何會改動版控狀態的指令**：`git commit`、`git add`、`git push`、`git merge`、
  `git rebase`、`git reset`、`git stash`、`git checkout` / `git switch`（含開新分支）、
  `git tag`、`gh pr create` 等一律不碰。
- **唯一例外**：使用者在當次對話中明確說了「可以提交」「幫我 commit」之類的指示。
  這個授權**只對該次提交有效**，不延續到後續改動 —— 下次還是要再問過。
  過去某次的同意不構成之後的授權。
- **唯讀 git 指令可以自由使用**：`git status`、`git diff`、`git log`、`git ls-files`、
  `git show`，用來了解狀態或回報改了什麼。
- 完成工作後**只回報改動了哪些檔案**，不要順手提交，也不要反覆追問要不要提交 ——
  說一次「已完成，未提交」就好。
- 若使用者明確要求提交才適用以下規則：
  - 目前預設分支是 `main`，提交前先開分支。
  - commit message 用中文祈使句，說明「改了什麼」與「為什麼」，例如：
    `把閱讀時間改成中文字數估法`
