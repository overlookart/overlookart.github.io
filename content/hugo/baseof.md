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

> 基础和块结构允许您定义网站页面结构的主框架  
> 关键字 block 允许您定义页面一个或多个主模板的外壳，然后根据需要填写或覆盖部分  

## 基础模版  

以下在_default/baseof.html上定义了一个简单的基础模板。它定义了网站的基本结构和标题等共用元素。  
其中 {{ block "main" . }}{{ end }} 是一个 Block， 其他模板通过继承并重写覆盖它的区域。  
{{- partial "head.html" . -}} 是嵌入了一个 Partial组件，该 Partial组件 可以被其他模版多次使用  
它定义了 head、header、main 和 footer 四个区域可以由子模板扩展。

``` html
<!DOCTYPE html>
<html>
    {{- partial "head.html" . -}}
    <body>
        {{- partial "header.html" . -}}
        <div id="main">
            {{- block "main" . }}
                <p>可被其他模版覆盖的内容</p>
            {{- end }}
            {{block "main2"}}
                <p>main2</p>
            {{end}}
        </div>
        {{- partial "footer.html" . -}}
    </body>
</html>
```

## Block 模块  

Hugo 中的 Block 是一种在模板中定义可重用内容的方法。  
它允许你在主框架 baseof 中定义一个区域,然后在模板中继承重写该区域的内容。  
不同的页面会根据 Kind 匹配不同的模版，  

使用 {{ block "block_name" }} 和 {{ end }} 标签定义一个 Block 区域:

``` html
<!-- baseof.html -->
<!-- 这定义了一个 content 的 block,包含默认的 <p>默认内容</p> -->
<body>
    {{ block "content" }} 
        <p>默认内容</p> 
    {{ end }}
</body>
```

在模板中使用 {{ define "block_name" }} 和 {{ end }} 重写这个 block:  

``` html
<!-- 这将 block 的内容设置为 <p>新内容</p>。 -->
{{ define "content" }} 
    <p>新内容</p>     
{{ end }} 
```

当该模板被渲染时,content block 的内容将被替换为子模板定义的内容  
页面还会加载 主框架baseof 除Block 内容外 的其他内容，  
这样页面就会保持整个网站主框架结构, 不用在每个模版中重复搭建主框架结构

``` html
<body>  
    <p>新内容</p> 
</body>
```

在 baseof.html 中可以定义多个 Block，在模版中可以重写 多个Block

## Partial 组件  

Partial 是 Hugo 中的组件功能，它允许你将模板分割为可重用的片段。这些片段可以在其他模板中嵌入和重用。  

Partial 模版放在项目的 /layouts/partials/ 目录下,如果在主题中使用则位于 /theme/themeName/layouts/partials/ 目录下  

``` html
<!-- /layouts/partials/head.html -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
```

在模版中使用 {{ partial "Partial_File_Name.html" . }} 将组件嵌入到当前模版中  

``` html
···
<!-- '-' 是为了去除前后空格 -->
{{- partial "head.html" . -}}
···
```

``` markmap

# markmap
## 介绍
## 使用
### 在 Hugo 中使用
```