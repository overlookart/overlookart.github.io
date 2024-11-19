---
# 文章的标题
title: "markmap"
# 文章的时间
date: 2023-06-23T15:44:49+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "Markmap是Markdown和思维导图的组合。它解析Markdown内容并提取其固有的层次结构，并呈现交互式思维导图。"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverookArt"
--- 


``` markmap {height = "20vh"}
# markmap
## 简介
## 使用方案  
1. React框架
2. Vue框架
3. auto-loader
4. VS Code 插件
## 在 Hugo 中的使用
1. 创建 markmap 语法的代码块渲染器  
2. 在页面内容模版中配置渲染功能  
3. 在 Markdown 文件中编写 markmap 代码块
```

## 简介  

Markmap是Markdown和思维导图的组合。  
它解析Markdown内容并提取其固有的层次结构，并呈现交互式思维导图。  

## 使用方案  

1. [基于 React 框架的使用](https://stackblitz.com/edit/markmap?file=index.tsx)
2. [基于 Vue 框架的使用](https://stackblitz.com/edit/markmap-vue?file=src/app.vue)
3. [基于 auto-loader 的使用](https://stackblitz.com/edit/markmap-autoloader?file=index.html)
4. [VS Code 插件](https://marketplace.visualstudio.com/items?itemName=gera2ld.markmap-vscode)

## 在 Hugo 中使用  

Hugo 中对  Markdown 的代码块(codeblock)语法 有自定义的渲染功能，可将 markmap 设为一种语法进行自定义渲染  

1. 创建 markmap 语法的代码块渲染器  

   ``` html
   <!-- /layout/_default/_markup/render-codeblock-markmap.html -->
   <!-- 获取 markmap 的高度 -->
   {{ $height := .Attributes.height }}
    <div class="markmap" id="markmap">
        <script type="text/template">
            {{- .Inner -}}
        </script>
    </div>
    <style>
        svg.markmap {
            width: 100%;
            height: {{ $height }};
        }
    </style>
    {{ .Page.Store.Set "hasMarkmap" true }}
   ```

2. 在页面内容模版中配置渲染功能

    ``` html
    <!-- 判断当前页面是否有 markmap 代码块 -->
    {{ if .Page.Store.Get "hasMarkmap" }}
        <!-- 为了更好的掌控渲染时机，将 markmap 的渲染方式设置为手动 -->
        <script>
            window.markmap = {
            autoLoader: { manual: true },
            };
        </script>
        <!-- 引入 markmap 相关脚本 -->
        <script src="https://cdn.jsdelivr.net/npm/markmap-autoloader@0.14.4"></script>
        <!-- 进行手动渲染 markmap -->
        <script>
            // 0.3s 后渲染 markmap
            setTimeout(() => {
                markmap.autoLoader.renderAll();
            }, 300);
        </script>
    {{ end }}
    ```

3. 在 Markdown 文件中编写 markmap 代码块  

``` markdown
``` markmap {height = "20vh"}
    # MarkMap
    ## 简介
    ## 使用方案  
    1. React框架
    2. Vue框架
    3. auto-loader
    4. VS Code 插件
    ## 在 Hugo 中的使用
    5. 创建 Markmap 语法的代码块渲染器  
    6. 在页面内容模版中配置渲染功能  
    7. 在 Markdown 文件中编写 markmap 代码块
```