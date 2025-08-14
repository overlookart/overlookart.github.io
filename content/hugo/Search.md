---
# 文章的标题
title: "Pagefind 搜索库"
# 文章的时间
date: 2025-08-14T14:02:55+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "使用 Pagefind 库为你的 Hugo 站点添加搜索功能"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

## 关于 Pagefind

[Pagefind](https://pagefind.app/) 是一个开源的静态站点搜索库，专为静态网站设计。它可以轻松地集成到各种静态网站生成器（如 Hugo、Jekyll、Eleventy 等）中，为用户提供快速且高效的搜索体验。Pagefind还提供了一个默认的用户界面，无需配置即可使用。


**Pagefind** 的主要特点包括：

* 支持多语言网站
* 丰富的知识过滤引擎
* 自定义排序属性
* 自定义元数据追踪
* 自定义内容权重
* 返回页面部分结果
* 跨域搜索
* 为任何东西添加索引
* 占有较少的带宽


## 构建索引

**Pagefind** 通常在静态站点生成后运行，摄取静态HTML文件并创建静态搜索索引。通过 npx 命令可以轻松地安装 **Pagefind** 并完成索引的构建。

```bash
npx pagefind --site "public"
```

> [!Note]
> "public" 是 Hugo 生成的静态网站的文件根目录，确保在运行此命令前已经执行了 `hugo server` 命令生成了站点。
> 执行上述命令后，Pagefind 会在 `public/pagefind` 目录下生成索引文件。

## 添加 Pagefind UI

在合适的 html 文件中添加搜索 UI， 通过下面3个步骤便可完成。

1. 导入 Pagefind 索引文件夹中的 CSS 和 JavaScript 文件。
2. 在需要展示搜索功能的页面中添加一个占位元素。
3. 在页面底部添加 JavaScript 代码来初始化 Pagefind UI。

```html
<link href="/pagefind/pagefind-ui.css" rel="stylesheet">
<script src="/pagefind/pagefind-ui.js"></script>

<div id="search"></div>

<script>
    window.addEventListener('DOMContentLoaded', (event) => {
        new PagefindUI({ element: "#search" });
    });
</script>
```
