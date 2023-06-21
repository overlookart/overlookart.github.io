---
# 文章的标题
title: "Remark"
# 文章的时间
date: 2023-06-21T11:32:09+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "文章描述"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverookArt"
---


---
class: center, middle, bg-teal-400
name: 首页
# Remark  

[官网](https://remarkjs.com/#1)
???
这是一个关于在 Hugo 中使用 Remark 制作幻灯片演示

---

# 在 Hugo 中使用


通过使用 partials 组件, `template` 模版，`section` 分组


1. 创建一个用于存放 Remark 内容的目录 /content/Slides
2. 创建一个 Slides 的页面模版 /layout/Slides/single.html

---

# 将 Remark 封装成一个组件 

创建一个用于渲染 Remark 的 partials 组件 /layout/partials/Remark.html

``` html
<textarea id="source">
    {{ .RawContent }}
</textarea>

<script src="https://gnab.github.io/remark/downloads/remark-latest.min.js"/>
    
<script>
    var slideshow = remark.create();
</script>
```