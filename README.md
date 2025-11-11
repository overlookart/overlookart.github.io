# OverlookArt 博客

一个基于 Hugo 的个人博客和笔记本项目，使用自定义主题 `overlookart` 构建。

## 项目简介

这是一个技术博客和笔记仓库，涵盖了前端开发、iOS开发、AI、工具使用等多个技术领域。项目使用 Hugo 静态站点生成器，结合自定义主题，提供美观的界面和丰富的功能。

## 访问站点

- [GitHub Pages](https://overlookart.github.io) - 主站点
- [Cloudflare Pages](https://overlookart-github-io.pages.dev) - 备用站点

## 主要特性

- 📝 **多语言支持** - 支持 Markdown 编写内容
- 🎨 **自定义主题** - 使用 TailwindCSS 和 SCSS 自定义样式
- 📊 **图表支持** - 集成 Mermaid 图表和词云
- 🔍 **搜索功能** - 使用 Pagefind 实现站点搜索
- 🎯 **响应式设计** - ~~适配移动端和桌面端~~
- 🚀 **多平台部署** - 支持 GitHub Pages、Cloudflare Pages、Netlify、Deno Deploy

## 技术栈

- **静态站点生成器**: Hugo
- **主题**: 自定义 overlookart 主题
- **样式**: TailwindCSS v4, SCSS
- **JavaScript**: 原生 JS，集成 GSAP 动画库
- **图表**: Mermaid, D3.js (词云)
- **部署**: 多平台支持

## 快速开始

### 环境要求

- Go 1.20+
- Node.js (用于前端资源管理)
- Hugo Extended 版本

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/overlookart/overlookart.github.io.git
   cd overlookart.github.io
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   hugo server
   ```

4. **构建站点**
   ```bash
   hugo
   ```

## 项目结构

```
├── archetypes/          # 文章模板
├── assets/             # 静态资源
├── config/             # 配置文件
├── content/            # 文章内容 (Markdown)
├── themes/overlookart/ # 自定义主题
├── resources/          # Hugo 生成的资源
└── README.md           # 项目文档
```

## 内容分类

- **AppleDevelop**: iOS/Swift/SwiftUI 开发笔记
- **h5Web**: 前端开发 (JavaScript, Vue.js, CSS)
- **AI**: 人工智能相关内容
- **hugo**: Hugo 使用指南
- **markdown**: Markdown 语法和工具
- **VSCode**: 编辑器配置和插件
- **terminal**: 命令行工具和配置

## 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 许可证

本项目采用 MIT 许可证。

## 部署信息

项目已部署到多个平台：
- GitHub Pages (2023-02-15)
- Cloudflare Pages (2024-07-15)
- Netlify (2024-11-28)
- Deno Deploy (2024-12-17)

---

> [!NOTE]
> 这是我的个人技术笔记和博客

> [!TIP]
> 使用搜索功能快速找到相关内容

> [!IMPORTANT]
> 内容仅供参考，实际开发请以官方文档为准

> [!WARNING]
> 请勿用于商业用途

> [!CAUTION]
> 部分内容可能过时，请注意时效性
