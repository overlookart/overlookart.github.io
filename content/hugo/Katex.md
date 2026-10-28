---
# 文章的标题
title: "Katex"
# 文章的时间
date: 2026-10-28T11:50:42+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "在 Hugo 项目中接入 KaTeX 数学公式渲染，按需加载、自动渲染 $...$ 公式"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

## 概述

KaTeX 是一个快速、轻量的 LaTeX 数学公式渲染库，相比 MathJax 加载更快，适合博客场景。
在 Hugo 中接入 KaTeX 的核心思路是：

1. 创建一个 `KaTeX.html` partial，**按需加载** CDN 资源（页面中出现公式才加载）。
2. 创建一个 `katex_help.js`，配置分隔符并调用 `renderMathInElement` 自动渲染。
3. 在主题的 `head.html` 中引入该 partial。

本项目实际落地的三个文件：

| 文件 | 作用 |
| --- | --- |
| `themes/overlookart/layouts/partials/KaTeX.html` | 检测公式并按需加载 KaTeX CSS/JS |
| `themes/overlookart/assets/js/katex_help.js` | 配置分隔符，执行自动渲染 |
| `themes/overlookart/layouts/partials/head.html` | 引入 partial |

## 第一步：创建 KaTeX.html partial

路径：`themes/overlookart/layouts/partials/KaTeX.html`

```html
{{- /* KaTeX 数学公式：仅当页面正文中出现可渲染的 $...$（同行成对）或 $$...$$ 时才按需加载。
       检测基于渲染后的 HTML，先剔除代码与图表区域，与 auto-render 实际处理范围保持一致：
       命令行示例（每行单个 $）、代码块、mermaid/markmap 内容都不会触发加载。 */ -}}
{{- $html := .Content -}}
{{- $html = replaceRE "(?is)<pre.*?</pre>" "" $html -}}
{{- $html = replaceRE "(?is)<code.*?</code>" "" $html -}}
{{- $html = replaceRE "(?is)<div class=\"mermaid\">.*?</div>" "" $html -}}
{{- $html = replaceRE "(?is)<div class=\"infographic-container\".*?</div>" "" $html -}}
{{- $html = replaceRE "(?is)<div id=\"wordcloud\".*?</div>" "" $html -}}
{{- $html = replaceRE "(?is)<script type=\"template\">.*?</script>" "" $html -}}
{{ if findRE "\\$\\$|\\$[^$\\n]+\\$" $html }}
<!-- KaTeX 数学公式渲染 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.19.1/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.19.1/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.19.1/dist/contrib/auto-render.min.js"></script>
{{ $katexjs := resources.Get "js/katex_help.js" | js.Build }}
<script defer src="{{ $katexjs.RelPermalink }}"></script>
{{ end }}
```

要点说明：

- **按需加载**：先剔除 `pre`、`code`、mermaid、词云、信息图等区域，再用正则检测是否剩余成对的 `$...$` 或 `$$...$$`，没有公式就不加载任何 KaTeX 资源，零开销。
- **剔除逻辑要与渲染范围一致**：命令行示例中每行单独出现的 `$`（如 `echo $PATH`）不是成对的，不会触发加载，避免误判。
- **`defer` 加载**：三个 CDN 资源与自定义脚本均使用 `defer`，不阻塞页面渲染，且按文档顺序执行。

## 第二步：创建 katex_help.js

路径：`themes/overlookart/assets/js/katex_help.js`

```js
// KaTeX 自动渲染：把正文中的 $...$（行内公式）和 $$...$$（独立公式）转换为数学公式
// 依赖脚本（katex.min.js、auto-render.min.js）以 defer 方式在本文件之前加载
function renderKaTeX() {
  if (typeof renderMathInElement !== 'function') return;
  var el =
    document.getElementById('nice') ||
    document.querySelector('#content article') ||
    document.body;
  renderMathInElement(el, {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
      { left: '\\(', right: '\\)', display: false },
      { left: '\\[', right: '\\]', display: true },
    ],
    // 图表容器内的 $ 是图表语法的一部分，不参与公式渲染
    ignoredClasses: ['mermaid', 'markmap', 'wordcloud', 'infographic-container'],
    throwOnError: false,
  });
}

renderKaTeX();
```

要点说明：

- **分隔符**：支持 `$...$`（行内）、`$$...$$`（独立）、`\(...\)`、`\[...\]` 四种写法。
- **`ignoredClasses`**：mermaid、markmap、词云、信息图等图表容器内的 `$` 是图表自身语法（如 mermaid 的 `style A fill:#f9f`），必须排除。
- **`throwOnError: false`**：公式写错时显示红色错误文本而不是让整页脚本报错。
- **容器选择**：优先渲染 `#nice`（主题正文容器），回退到 `article`，最后回退到 `body`。

## 第三步：在 head.html 中引入

路径：`themes/overlookart/layouts/partials/head.html`，在文件末尾追加：

```html
<!-- KaTeX 数学公式 -->
{{ partial "KaTeX.html" . }}
```

## Markdown 中的公式写法约定

```markdown
行内公式：质量 $m$ 的动能为 $E_k = \frac{1}{2}mv^2$。

独立公式（独占一行，前后各留一个空行）：

$$
\bar{r} = \frac{1}{n}\sum_{i=1}^{n} r_i
$$
```

需要注意的约定：

- **独立公式必须单行书写**：`$$` 公式不要在 Markdown 中折行，避免 `findRE` 的 `\n` 检测不到成对符号。
- **百分号转义**：正文中的字面 `%` 写成 `\%`（LaTeX 中 `%` 是注释符）。
- **中文用 `\text{}` 包裹**：如 `\text{收益率} = \frac{a}{b}`，直接写中文会报错。
- **转义反斜杠**：`$a \times b$`、`$x \in \mathbb{R}$` 等命令直接书写即可。

## 验证

```bash
hugo server -D
```

在含有 `$...$` 的文章页面按 `F12` 打开控制台，确认加载了 `katex.min.css`、`katex.min.js`、`auto-render.min.js` 与打包后的 `katex_help.js`，且公式被渲染为 `<span class="katex">` 结构。在无公式的文章中确认这些资源**没有**被加载。

## 常见问题

- **`$` 出现在代码块中被误渲染**：partial 的剔除逻辑只负责「决定是否加载」，实际渲染范围由 `ignoredClasses` 与 auto-render 自身规则决定；代码块内的内容不在 `renderMathInElement` 处理范围内（`<code>`/`<pre>` 默认被忽略），无需额外配置。
- **mermaid 图报错或 `$` 消失**：确认 `ignoredClasses` 包含 `mermaid`、`markmap`、`wordcloud`、`infographic-container`。
- **公式与主题 CSS 冲突**：KaTeX 的 CSS 在 `head.html` 末尾加载，通常可覆盖主题样式；如有冲突可用 `.katex` 选择器微调。
