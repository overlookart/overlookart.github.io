---
title: "HUGO"
date: 2023-02-18
draft: true
---

# HUGO  

## 快速使用  

``` shell
# 安装
$ brew install hugo

# 查看安装的版本 
$ hugo version

# 生成站点
$ hugo new site 

# 下载主题
$ submodule add https://github.com/theNewDynamic/gohugo-theme-ananke themes/ananke

# 配置主题
$ echo "theme = 'ananke'" >> config.toml

# 添加页面 
$ hugo new posts/my-first-post.md

# 运行调试
$ hugo serve
$ hugo server -D

# 编译
$ hugo
$ hugo -D #编译正在开发的文章
$ hugo -E #编译已经过期的文章
$ hugo -F #编译即将发布的文章
```  

## 部署  

``` shell
$ hugo --theme=hyde --baseUrl="http://xxx.github.io/"
```  

