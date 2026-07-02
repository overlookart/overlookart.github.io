---
title: "HUGO"
date: 2023-02-18
draft: false
description: "HUGO 的快速使用"
---

## HUGO 简介  

[**Hugo**](https://gohugo.io)是一款由Go语言开发的静态网站生成器。它的主要特点是:  

* **速度极快**:Hugo能在毫秒级内构建网站,主要因为它基于Go开发可以进行并行编译。
* **易用**:Hugo有简单的命令和直观的配置,非常易于上手和使用。
* **跨平台**:可以在Windows、Linux、macOS等任意平台安装运行。
* **博客友好**:内置支持文章、标签、分类等元素,非常适合构建博客网站。
* **支持主题**:有丰富的开源主题可供选择,可以方便切换主题修改网站样式。
* **自定义**:Hugo支持自定义模板、样式、布局等,可以完全控制网站输出。
* **部署方便**:可以方便部署到任意静态网站托管服务,还支持自动部署。
* **开源免费**:Hugo是完全开源的项目,可以免费商业使用。
* **社区活跃**:有活跃的用户社区可以提供各种资料和帮助。  
* **适用场景**:博客、公司官网、文档站、作品集、落地页。

## 快速使用

### 安装 Hugo  

``` shell
# macOS 安装
$ brew install hugo
# macOS 更新
$ brew upgrade hugo
# windows 安装
$

```

### 验证安装

``` shell
# 查看安装的版本 
$ hugo version

$ hugo env

```

``` shell

# 生成站点
$ hugo new site 

# 下载主题
$ git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke themes/ananke

# 配置主题
$ echo "theme = 'ananke'" >> config.toml

# 添加页面 
$ hugo new posts/my-first-post.md

# 运行调试
$ hugo serve
$ hugo server -D

# 编译
$ hugo
$ hugo -D #编译正在开发的文章
$ hugo -E #编译已经过期的文章
$ hugo -F #编译即将发布的文章
```  

## 构建过程

Hugo 的构建过程是一个**单向数据流管道**：

1. **初始化配置**  
   读取 `hugo.toml/yaml/json`、环境变量、命令行参数，合并成最终配置对象。

2. **加载数据源**  
   * 解析 `content/` 下 Markdown 文件（Front Matter + Body）  
   * 读取 `data/` 目录下 JSON/TOML/YAML 数据文件  
   * 加载 `static/` 与 `assets/` 静态资源  
   * 构建内部 **Page 集合**、**Site 对象**、**Resource 对象** 等数据结构

3. **主题与模板解析**  
   根据 `theme` 配置加载主题模板（`layouts/`）、部分模板、短代码；支持模板覆盖链（项目 > 主题 > 内置）。

4. **页面渲染**  
   对每个 Page：  
   * 按 `type`/`kind` 选择模板  
   * 将 Page 数据注入模板执行 → 生成 HTML  
   * 同时处理分类、归档、RSS、Sitemap 等聚合页面

5. **资源管道处理** —— *核心差异点*  
   `assets/` 资源经 **Hugo Pipes** 处理：  
   * SCSS/PostCSS → CSS（含 Autoprefixer、压缩）  
   * JS 打包、转译、指纹哈希  
   * 图片裁剪、格式转换、WebP 生成  
   * 结果写入 `public/` 并生成 `resources/_gen/` 缓存

6. **静态文件复制**  
   `static/` 目录内容**原样复制**到 `public/`（不经管道）。

7. **输出 public/**  
   最终生成的 `public/` 即为可部署的静态站点。**部署本身由外部 CI/CD 完成**，不在 Hugo 职责内。

```mermaid
flowchart LR
  A[配置文件] --> B[初始化]
  B --> C[加载内容与数据]
  C --> D[解析模板/主题]
  D --> E[渲染 HTML 页面]
  C --> F[assets 资源]
  F --> G[Hugo Pipes 处理]
  H[static 资源] --> I[直接复制]
  G --> J[public/]
  E --> J
  I --> J
  J -.-> K[(部署: GitHub Actions / Netlify / ...)]
```

## 部署到 Github  

### 先决条件

1. 创建 Github 账号  
2. 安装 Git 环境
3. 创建 Hugo 项目，并使用 Hugo serve 在本地测试  

### 网站类型  

GitHub Pages网站有三种类型：项目、用户和组织。项目站点连接到GitHub上托管的特定项目。用户和组织网站连接到GitHub.com上的特定帐户。

### 部署流程  

1. 创建一个 GitHub 仓库  
2. 将本地的 Hugo 项目代码提交到 GitHub 仓库
3. 修改 GitHub 仓库的名称为 “”
4. 配置 GitHub Pages  
5. 将 GitHub Pages 的部署方式改为 GitHub Actions  
6. 在 GitHub 仓库 的 workflows 下创建部署脚本文件 /workflows/hugo.yaml  
7. 编写部署脚本
   ``` yaml
   # Sample workflow for building and deploying a Hugo site to GitHub Pages
    name: Deploy Hugo site to Pages

    on:
    # Runs on pushes targeting the default branch
    push:
        branches:
        - main

    # Allows you to run this workflow manually from the Actions tab
    workflow_dispatch:

    # Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
    permissions:
    contents: read
    pages: write
    id-token: write

    # Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
    # However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
    concurrency:
    group: "pages"
    cancel-in-progress: false

    # Default to bash
    defaults:
    run:
        shell: bash

    jobs:
    # Build job
    build:
        runs-on: ubuntu-latest
        env:
        HUGO_VERSION: 0.136.4
        steps:
        - name: Install Hugo CLI
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
          && sudo dpkg -i ${{ runner.temp }}/hugo.deb          
      - name: Install Dart Sass Embedded
        run: sudo snap install dart-sass-embedded
      - name: Checkout
        uses: actions/checkout@v3
        with:
          submodules: recursive
          fetch-depth: 0
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v3
      - name: Install Node.js dependencies
        run: "[[ -f package-lock.json || -f npm-shrinkwrap.json ]] && npm ci || true"
      - name: Build with Hugo
        env:
          # For maximum backward compatibility with Hugo modules
          HUGO_ENVIRONMENT: production
          HUGO_ENV: production
        run: |
          hugo \
            --gc \
            --minify \
            --baseURL "${{ steps.pages.outputs.base_url }}/"          
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: ./public

    # Deployment job
    deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
   ```

8. 使用类似“添加工作流”的提交消息将更改提交到本地存储库，然后推送到GitHub。

content 提供 markdown 文件作为页面内容

layouts 提供页面布局及样式

## Hugo Modules  

1. 安装 go 环境 https://golang.org/dl/  
2. 初始化 $ hugo mod init github.com/gohugoio/myShortcodes
3. 添加一个主题模块 $ hugo mod get github.com/panr/hugo-theme-terminal
4. 配置项目模块
5. 更新所有模块 $ hugo mod get -u 
