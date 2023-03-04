---
# 文章的标题
title: "Hugoconfig"
# 文章的时间
date: 2023-03-03T17:55:54+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "文章描述"
# 作者
author: "OverookArt"
---

# HUGO 项目配置  

> HUGO 项目初始化后 会在项目根目录生成 ./config.toml 的配置文件  
> HUGO 项目支持 config.toml, config.yaml, config.json 三种格式  


## 基本配置  

``` json
{   // config.json
    // 域名路径
    "baseURL": "http://example.org/",
    // 网站的标题
    "title": ""
    // 是否编译草稿页面
    "buildDrafts": false,
    // 是否编译过期页面
    "buildExpired": false,
    // 是否编译未发布页面
    "buildFuture": false,
    // 是否将相对路径转为绝对路径
    "canonifyURLs": false,
    // 编译时，从静态目录中删除找不到的目标文件。
    "cleanDestinationDir": false,
    // 版权声明
    "copyright": "",
    // 默认的内容语言指示器
    "defaultContentLanguage": "en",
    // 在子目录中呈现默认内容语言，例如content/en/。然后，站点根/将重定向到/en/。
    "defaultContentLanguageInSubdir": false,

    ""
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