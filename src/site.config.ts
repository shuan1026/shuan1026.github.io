import type { AstroExpressiveCodeOptions } from "astro-expressive-code";
import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
	// astro.config.ts 的 `site` 直接讀這個值，這裡是全站網址的唯一來源
	url: "https://shuan1026.com/",
	/*
		- meta title 的來源（src/components/BaseHead.astro）
		- webmanifest 的 name（astro.config.ts）
		- Header 與 Footer 的站名連結
	*/
	title: "Mark Tsai",
	author: "Mark Tsai",
	// 預設的 description meta 與 webmanifest description
	description: "工程筆記與技術文章。",
	// <html lang>（src/layouts/Base.astro）、Intl 日期格式、webmanifest。
	// Pagefind 也是讀這個值決定用哪套分詞器。
	lang: "zh-TW",
	ogLocale: "zh_TW",
	// 仙人掌是佈景主題的識別，不是這個站的
	showLogo: false,
	// 傳給 Intl.DateTimeFormat 的參數，見 src/utils/date.ts
	date: {
		options: {
			year: "numeric",
			month: "long",
			day: "numeric",
			// ★ 一定要指定。FormattedDate 沒帶 timeZone 就跟著執行環境的時區跑，
			//   CI runner 是 UTC，2026-08-12T00:00+08:00 會被印成「2026年8月11日」。
			timeZone: "Asia/Taipei",
		},
	},
};

// Used to generate links in both the Header & Footer.
export const menuLinks: { path: string; title: string }[] = [
	{
		path: "/",
		title: "Home",
	},
	{
		path: "/posts/",
		title: "Posts",
	},
	{
		path: "/tags/",
		title: "Tags",
	},
	{
		path: "/about/",
		title: "About",
	},
];

// https://expressive-code.com/reference/configuration/
export const expressiveCodeOptions: AstroExpressiveCodeOptions = {
	styleOverrides: {
		borderRadius: "4px",
		codeFontFamily:
			'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", "PingFang TC", "Noto Sans TC", monospace',
		codeFontSize: "0.875rem",
		codeLineHeight: "1.7142857rem",
		codePaddingInline: "1rem",
		frames: {
			frameBoxShadowCssValue: "none",
		},
		uiLineHeight: "inherit",
	},
	themeCssSelector(theme, { styleVariants }) {
		// If one dark and one light theme are available
		// generate theme CSS selectors compatible with cactus-theme dark mode switch
		if (styleVariants.length >= 2) {
			const baseTheme = styleVariants[0]?.theme;
			const altTheme = styleVariants.find((v) => v.theme.type !== baseTheme?.type)?.theme;
			if (theme === baseTheme || theme === altTheme) return `[data-theme='${theme.type}']`;
		}
		// return default selector
		return `[data-theme="${theme.name}"]`;
	},
	// One dark, one light theme => https://expressive-code.com/guides/themes/#available-themes
	themes: ["dracula", "github-light"],
	useThemedScrollbars: false,
};
