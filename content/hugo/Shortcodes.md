---
# 文章的标题
title: "Shortcodes"
# 文章的时间
date: 2024-04-02T15:11:23+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "在 Markdown 文件中插入 shortcodes 的方式添加HTML"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

> 短代码是内容文件中调用内置或自定义模板的简单片段。
> 有时以Markdown语法展示内容是不够的。通常需要在Markdown内容中被迫添加原始HTML（例如视频\<iframe\>）。我们认为这与Markdown语法的美丽简单性相矛盾。
> Hugo 通过 shortcodes 规避这些限制

shortcodes 是内容文件中的简单片段，Hugo 将使用预定义的模板渲染。请注意，短代码在模板文件中不起作用。如果您需要短代码提供的类型，但在模板中，您很可能想要一个部分模板。

除了更干净的 Markdown 外，shortcodes 还可以随时更新，以反映新的类、技术或标准。在网站生成时，shortcodes 将轻松地在您的更改中合并。您避免了可能复杂的搜索和替换操作。

## 创建 shortcodes

在 layouts 文件夹下 创建 shortcodes 文件夹， 用于存放所有的 shortcodes 文件

``` html
<!-- 以 iframe 为例 -->
<!-- /layouts/shortcodes/iframe.html -->
<iframe class="w-full min-h-screen" src="{{ .Get "src" }}"></iframe>
```

## 使用 shortcodes

在任意内容文件内使用 **\{\{< shortcodename parameters >\}\}** 语法将 shortcodes 插入内容中

``` md
<!-- /content/type/pageName.md -->
---
一些扉页内容
---
<!-- 插入 shortcodes iframe -->
<!-- {{< iframe src="https://astro.build" title="Astro" other="其他参数" class="w-full min-h-screen">}} -->

```