---
# 文章的标题
title: "Custom Hugo Theme"
# 文章的时间
date: 2023-02-26T00:02:48+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "文章描述"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate: 2023-02-26T00:02:48+08:00 
# 文章的发布时间  未到达发布时间不会发布到文章列表
publishDate: 2023-02-26T00:02:48+08:00
# 上次修改的日期
lastmod: 2023-02-26T00:02:48+08:00
# 作者
author: "OverookArt"
---

# 自定义 Hugo 主题  

## 创建一个主题  

``` shell
# 在项目根目录下执行
$ hugo new theme [newTheme] #会在项目的主题文件夹下创建对应名字的主题 /theme/newTheme/

# 在配置文件设置新创建的主题 /config.toml
theme = 'newTheme' #启动项目后生效
```



## 文件结构说明  

``` shell
./theme # 项目的主题目录
    |--newTheme #新建的主题目录
        |--archetypes #新建页面时的扉页模版
        |--|--default.md #默认的扉页模版
        |--|--posts.md # 在 posts 分组下新建页面的扉页模版 优先级比 default 高
        |--assets # Hugo Pipes 的资源(css, js),通过.Permalink,.RelPermalink 引用发布到项目 public
        |--|--style.css # 主题用到的 css 文件
        |--layout #页面的模版文件
        |--|_default # 页面默认默认模版位置
        |--|--|--baseof.html #站点的主框架,首先要加载的内容
        |--|--|--index.html #首页模版 Kind 为 home 的页面会匹配该模版
        |--|--|--list.html #分组模版 Kind 为 section 的页面会匹配该模版
        |--|--|--single.html #单页面模版 Kind 为 page 的页面会匹配该模版
        |--|partials # 放一些子模块
        |--static #主题使用到的 img...
        |--theme.toml #主题配置文件
```

## Hugo Theme 是如何工作的？

### 页面加载流程

1. 加载主题内站点的主框架 baseof.html
2. 根据页面的 `Kind` 属性匹配 /layout 下面的模版文件  
    | Page.Kind | Template |
    |-----------|----------|
    |home|index.html|
    |section|list.html|
    |page|single.html|
3. 执行模版文件的模版语法 加载相应的子模块
4. 生成完整的静态页面

### 匹配模版的优先级  

- /layout 的优先级 高于 /theme/newTheme/layout  

## css 文件引用

- css 样式文件位于 ./assets 文件夹内
- 站点使用的样式文件一般在 head 标签内引入
- ./layout/_default/baseof.html 站点框架文件包含完整的html格式 head 和 body
- 将 head 部分模块化为 ./layout/partials/head.html
- 在 head 模块内引入 css 样式文件
  
  ``` templates
    {{ $style := resources.Get "scss/style.scss" }}
    {{ $a := $style | resources.ToCSS }}
    <link rel="stylesheet" href="{{ $a.Permalink }}">
  ```

- 在模版文件的元素就可以使用相应的样式了
