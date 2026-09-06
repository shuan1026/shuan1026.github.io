import type { Image, Nodes, Parents } from "mdast";
import { toString as mdastToString } from "mdast-util-to-string";
import getReadingTime from "reading-time";
import type { HastPluginDefinition, MdastPluginDefinition } from "satteri";

export function satteriAutolinkHeadingsPlugin(): HastPluginDefinition {
	return {
		name: "cactus-autolink-headings",
		element: {
			filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
			visit(node) {
				const id = node.properties?.id;
				if (typeof id !== "string" || !id) return;
				return {
					...node,
					children: [
						{
							type: "element",
							tagName: "a",
							properties: { href: `#${id}`, className: ["not-prose"] },
							children: [...node.children],
						},
					],
				};
			},
		},
	};
}

/** 中文閱讀速度（字/分）。改版前的 Liquid 估法也是這個值。 */
const CHARS_PER_MINUTE = 300;

export function satteriReadingTimePlugin(): () => MdastPluginDefinition {
	return () => {
		let done = false;
		return {
			name: "cactus-reading-time",
			text(node, ctx) {
				if (done) return;

				let root: Readonly<Nodes> = node;
				let parent: Readonly<Parents> | undefined = ctx.parent(root);
				while (parent) {
					root = parent;
					parent = ctx.parent(root);
				}

				done = true;
				const textOnPage = mdastToString(root);
				// reading-time 會把每個 CJK 表意文字算成一個「word」（見其 isCJK()，
				// 涵蓋 U+4E00–9FFF 等），所以這裡的 wordsPerMinute 等同「每分鐘字數」。
				// 300 沿用改版前 Jekyll 版 _layouts/post.html 的估法。
				// 不用 readingTime.text —— 那是套件寫死的英文 "N min read"。
				const { words } = getReadingTime(textOnPage, { wordsPerMinute: CHARS_PER_MINUTE });
				const minutes = Math.max(1, Math.round(words / CHARS_PER_MINUTE));

				ctx.data.astro!.frontmatter.readingTime = `約 ${minutes} 分鐘`;
			},
		};
	};
}

/**
 * 把寬表格包進可橫向捲動的容器。
 *
 * Markdown 產生的 <table> 沒有外層容器，欄位一多就會把整頁撐寬（手機上尤其明顯：
 * 內容被切掉又沒有捲軸）。這裡在建置期補上包裝，不用執行期 JS。
 * tabindex="0" 是必要的 —— 沒有它，鍵盤使用者無法捲動這個區域（WCAG 2.1.1）。
 */
export function satteriScrollableTablesPlugin(): () => HastPluginDefinition {
	return () => {
		// 包過的 table 記起來，避免走訪到新產生的子樹時重複包裝
		const wrapped = new WeakSet<object>();
		return {
			name: "cactus-scrollable-tables",
			element: {
				filter: ["table"],
				visit(node) {
					if (wrapped.has(node)) return;
					wrapped.add(node);
					return {
						type: "element",
						tagName: "div",
						properties: {
							className: ["table-scroll"],
							tabIndex: 0,
							role: "region",
							"aria-label": "表格",
						},
						children: [node],
					};
				},
			},
		};
	};
}

export function satteriUnwrapImagesPlugin(): MdastPluginDefinition {
	return {
		name: "cactus-unwrap-images",
		paragraph(node): Image | undefined {
			const child = node.children[0];
			if (node.children.length === 1 && child?.type === "image") {
				return child;
			}
			return;
		},
	};
}

export function satteriFootnoteLabelPlugin(): HastPluginDefinition {
	return {
		name: "cactus-footnote-label",
		element: {
			filter: ["h2"],
			visit(node, ctx) {
				if (node.properties?.id !== "footnote-label") return;
				ctx.setProperty(node, "className", [""]);
			},
		},
	};
}

export function satteriExternalLinksPlugin(): HastPluginDefinition {
	return {
		name: "cactus-external-links",
		element: {
			filter: ["a"],
			visit(node, ctx) {
				const href = node.properties?.href;
				if (typeof href !== "string" || !href) return;

				let url: URL;
				try {
					url = new URL(href);
				} catch {
					return; // relative path or fragment, not "external"
				}

				if (url.protocol !== "http:" && url.protocol !== "https:") return;

				ctx.setProperty(node, "rel", ["noreferrer", "noopener"]);
				ctx.setProperty(node, "target", "_blank");
			},
		},
	};
}
