---
# 文章的标题
title: "HUGO 项目配置"
# 文章的时间
date: 2023-03-03T17:55:54+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "文章描述"
# 作者
author: "OverookArt"
---

> HUGO 项目初始化后 会在项目根目录生成 ./config.toml 的配置文件  
> HUGO 项目支持 config.toml, config.yaml, config.json 三种格式  


## 基本配置  

``` json
{   // config.json
    // 域名路径
    "baseURL": "http://example.org/",
    // 网站的标题
    "title": "",
    // 版权声明
    "copyright": "",
    // 是否将相对路径转为绝对路径
    "canonifyURLs": false,
    // 编译时，从静态目录中删除找不到的目标文件。
    "cleanDestinationDir": false,
    //禁用网址/路径转换为小写。
    "disablePathToLower": false,
    //禁用浏览器窗口的自动实时重新加载。
    "disableLiveReload": false,
    //禁用指定种类的所有页面。此列表中允许的值：
    //“page”、“home”、“section”、“taxonomy”、“term”、“RSS”、“sitemap”、“robotsTXT”、“404”。
    "disableKinds": [],
    //默认情况下，Hugo将仅在主页的HTML头部注入一个生成器元标签。你可以关闭它，
    //但如果你不这样做，我们将不胜感激，因为这是观看雨果人气上升的好方法。
    "disableHugoGeneratorInject": false,
    //将禁用别名重定向的生成。请注意，即使设置了禁用别名，别名本身也会保留在页面上。
    //其动机是能够使用自定义输出格式在.htaccess、Netlify _redirects文件或类似文件中生成301重定向。
    "disableAliases": false,
    // 默认的内容语言指示器
    "defaultContentLanguage": "en",
    // 在子目录中呈现默认内容语言，例如content/en/。然后，站点根/将重定向到/en/。
    "defaultContentLanguageInSubdir": false,
    //启用。每个页面的GitInfo对象（如果Hugo网站由Git版本控制）。然后，这将使用该内容文件的最后一个git提交日期更新每个页面的Lastmod参数。
    "enableGitInfo": false,
}
```

## 目录配置  

``` json
{   // config.json
    ...
    // 读取页面文件的目录
    "contentDir": "content",
    // 读取数据文件的目录
    "dataDir": "data",
    // 读取资源文件的目录 通过 resources.Get 获取该目录下的资源
    "assetDir": "assets",
    // 读取 markdown 的扉页配置模版目录
    "archetypeDir": "archetypes",
    // 编译后生成站点的目录
    "publishDir": "public",
    // 读取主题的目录
    "themesDir": "themes"
    ...
}
```

## 编译配置  

``` json
{   // config.json
    // 是否编译草稿页面
    "buildDrafts": false,
    // 是否编译过期页面
    "buildExpired": false,
    // 是否编译未发布页面
    "buildFuture": false,
}
```

## 配置模块化

> HUGO 会根据不同的运行环境加载对应的配置项  
> 没有创建运行环境配置项会加载默认的配置项  
> ./config/_default/config.json 默认的配置  
> ./config/development/config.json 开发环境的配置项  
> ./config/production/config.json 生成环境的配置项 
> 还可以将 ../config.json 文件中的配置集合拆分到单个文件 例如菜单可以拆分 ../menu.json  

## 配置菜单模块

``` json
// menu.json
{   // 读取菜单:
    "main":[
        {
            // 唯一标识
            "identifier":"",
            // 菜单名称
            "name":"",
            // 
            "url": "",
            // 打开页面的 a 标签
            "pre":"",
            // 对页面路径的引用
            "pageRef": "",
            // 菜单权重 对菜单项按权重进行升序排序
            "weight": 1,
            // 父级菜单的唯一标识
            "parent": "",
            // 子菜单
            "children":[],
            // ?
            "post": "",
            // 附加参数
            "params":{
                ...
            }
        }
    ]
}
```

``` templates
<!-- 获取菜单配置 -->
{{ .Site.Menus.main }}
```