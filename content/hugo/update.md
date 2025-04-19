---
# 文章的标题
title: "更新 HUGO"
# 文章的时间
date: 2025-04-19T09:26:58+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "升级 Hugo 版本，包括本地运行环境和远端运行环境。"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

## 更新本地环境

使用 `brew` 更新 **HUGO**

``` shell
$ brew upgrade hugo

```

如果在网站的 head 配置了 HUGO 的标识 `{{ hugo.Generator }}`,启动项目后检查 head 中的元素，就会有一下内容：

``` html
<meta name="generator" content="Hugo 0.146.5">
```

其中属性 content 的值就会有运行环境 Hugo 的版本，如 0.146.

## 更新 Github Page 环境

在项目的 /.github/workflows 目录中找到用于 Github Page 的部署文件，修改 `HUGO_VERSION` 的值为指定版本号。

``` yml
...
jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.146.5
...
```

## 更新 Deno 环境

在项目的 /.github/workflows 目录中找到用于 Deno 的部署文件，修改 `HUGO_VERSION` 的值为指定版本号。

``` yml
...
jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    env:
        HUGO_VERSION: 0.146.5
...
```

## 更新 Netlify 环境

1. 登录 [Netlify 平台](https://app.netlify.com/)。
2. 进入 部署的 Hugo 的网站详情页。
3. 打开 `Site Configuration` 菜单。
4. 找到 `Environment variables` 选项。
5. 将 `HUGO_VERSION` 的修改为指定版本号，并进行保存。
6. 重新部署 Hugo 网站。
