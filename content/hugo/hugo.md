---
title: "HUGO"
date: 2023-02-18
draft: false
description: "HUGO 的快速使用"
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
$ git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke themes/ananke

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

## 部署到 Github  

1. 创建 Github 账号  
2. 创建 博客代码仓库
3. 配置仓库名称
    > 设置仓库明为 Github用户名.github.io
4. 将 hugo 项目提交到 仓库

## Hugo Modules  

1. 安装 go 环境 https://golang.org/dl/  
2. 初始化 $ hugo mod init github.com/gohugoio/myShortcodes
3. 添加一个主题模块 $ hugo mod get github.com/panr/hugo-theme-terminal
4. 配置项目模块
5. 更新所有模块 $ hugo mod get -u 
