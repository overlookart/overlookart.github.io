# OverlookArt 博客

一个基于 Hugo 的个人博客和笔记本项目，使用自定义主题 `overlookart` 构建。

## 访问站点

- [GitHub Pages](https://overlookart.github.io) - 主站点
- [Cloudflare Pages](https://overlookart-github-io.pages.dev) - 备用站点

## 主要特性

- **多语言支持** - 支持 Markdown 编写内容
- **自定义主题** - 使用 TailwindCSS v4 和 SCSS 自定义样式
- **图表支持** - 集成 Mermaid 图表和 D3.js 词云
- **搜索功能** - 使用 Pagefind 实现站点搜索
- **动画效果** - 集成 GSAP 动画库
- **多平台部署** - 支持 GitHub Pages、Cloudflare Pages、Netlify、Deno Deploy
- **代码高亮** - 支持多种编程语言

## 技术栈

- **静态站点生成器**: Hugo Extended
- **主题**: 自定义 overlookart 主题
- **样式**: TailwindCSS v4, SCSS
- **JavaScript**: 原生 JS，集成 GSAP 动画库
- **图表**: Mermaid, D3.js (词云)
- **部署**: GitHub Actions 自动部署

## 快速开始

### 环境要求

- Go 1.20+
- Node.js 18+
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
   # 或监听所有网卡
   hugo server --bind 0.0.0.0
   ```

4. **构建站点**
   ```bash
   hugo
   ```

### 使用 npm 脚本

```bash
npm run dev    # 开发模式
npm run build  # 构建生产版本
```

## 项目结构

```
.
├── .github/workflows/     # GitHub Actions 配置
├── archetypes/            # 文章模板
├── assets/               # 静态资源 (SCSS, JS)
├── config/               # 配置文件
│   ├── _default/        # 默认配置
│   ├── development/     # 开发环境配置
│   └── production/      # 生产环境配置
├── content/              # 文章内容 (Markdown)
├── public/               # 构建输出 (git 托管)
├── resources/            # Hugo 生成的资源
├── static/               # 静态文件
├── themes/overlookart/   # 自定义主题
├── package.json          # Node.js 依赖
├── go.mod                # Go 模块配置
└── README.md             # 项目文档
```

## 内容分类

- **AppleDevelop**: iOS/Swift/SwiftUI 开发笔记
- **h5Web**: 前端开发 (JavaScript, Vue.js, CSS)
- **AI**: 人工智能相关内容
- **posts**: 技术文章
- **terminal**: 命令行工具和配置

## 主题配置

主题配置文件位于 `themes/overlookart/`：

- `theme.toml` - 主题元信息
- `tailwind.config.js` - Tailwind 配置
- `tailwind.css` - Tailwind 入口样式
- `layouts/` - 模板文件

## 部署

项目已配置 GitHub Actions (`.github/workflows/hugo.yml`)，推送到 main 分支后自动部署到 GitHub Pages。

也支持手动部署到其他平台：
- Cloudflare Pages
- Netlify
- Deno Deploy

## 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 许可证

MIT License

---

> [!NOTE]
> 这是我的个人技术笔记和博客

> [!TIP]
> 使用搜索功能快速找到相关内容
