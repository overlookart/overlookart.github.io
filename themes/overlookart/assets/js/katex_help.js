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
