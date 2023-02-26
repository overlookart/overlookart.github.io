---
# 文章的标题
title: "HomeBrew"
# 文章的时间
date: 2023-02-26T22:34:14+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "文章描述"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate: 2023-02-26T22:34:14+08:00 
# 文章的发布时间  未到达发布时间不会发布到文章列表
publishDate: 2023-02-26T22:34:14+08:00
# 上次修改的日期
lastmod: 2023-02-26T22:34:14+08:00
# 作者
author: "OverookArt"
---

# HomeBrew  

macOS（或 Linux）缺失的软件包的管理器

## 官网  

> https://brew.sh  

## 安装  

> /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"  

## 更新  

> $ brew update  

## 查看版本  

> $ brew -v  

## 卸载  

## 使用  

### 安装工具包  

> $ brew install wget

### 安装目录  

> Homebrew 会将软件包安装到独立目录，并将其文件软链接至 /usr/local 。

``` shell
$ cd /usr/local
$ find Cellar
Cellar/wget/1.16.1
Cellar/wget/1.16.1/bin/wget
Cellar/wget/1.16.1/share/man/man1/wget.1

$ ls -l bin
bin/wget -> ../Cellar/wget/1.16.1/bin/wget
```

### 卸载工具包  

> $ brew uninstall `packageName`

### 查询可用包  

> $ brew search `packageName`

### 查看已安装包列表  

> $ brew list

### 查看任意包信息  

> $ brew info `packageName`
