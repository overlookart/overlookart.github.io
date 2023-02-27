---
# 文章的标题
title: "Node 版本管理"
# 文章的时间
date: 2023-02-27T11:02:34+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "文章描述"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate: 2023-02-27T11:02:34+08:00 
# 文章的发布时间  未到达发布时间不会发布到文章列表
publishDate: 2023-02-27T11:02:34+08:00
# 上次修改的日期
lastmod: 2023-02-27T11:02:34+08:00
# 作者
author: "OverookArt"
---
# Node 版本管理  

## 全局安装 n  

``` shell
$ npm install -g n
```

## 安装最新版  

``` shell
$ n latest
```

## 安装最新稳定版  

``` shell
$ n stable
```

## 安装某个版本  

``` shell
$ n 10.13.0
```

## 删除某个版本

``` shell
$ n rm 10.13.0
```

## 切换版本  

``` shell
$ n 10.13.0
```

## 以指定的版本来执行脚本  

``` shell
$ n use 10.13.0  test.js
```

## 查看已安装版本  

``` shell
$ n ls
```

## 查看服务器上所有可用的版本  

``` shell
$ n ls-remote --all
```
