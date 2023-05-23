---
# 文章的标题
title: "主框架构建"
# 文章的时间
date: 2023-05-22T11:21:28+08:00
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

> 基础和块结构允许您定义网站主框架外壳  
> 关键字 block 允许您定义页面一个或多个主模板的外壳，然后根据需要填写或覆盖部分  

## 定义主框架模版  

以下在_default/baseof.html上定义了一个简单的基本模板。作为默认模板，它是将呈现所有页面的外壳，除非您指定另一个更接近查找顺序开头的*baseof.html。  

``` html
<!DOCTYPE html>
<html>
    {{- partial "head.html" . -}}
    <body>
        {{- partial "header.html" . -}}
        <div id="main">
            {{- block "main" . }}{{- end }}
        </div>
        {{- partial "footer.html" . -}}
    </body>
</html>
```