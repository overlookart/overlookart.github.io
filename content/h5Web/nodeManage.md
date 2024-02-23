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
## Node 版本管理  

* 全局安装 Node 版本管理工具 n  

``` sh
$ npm install -g n
```

* 安装 Node 最新版  

``` sh
$ n latest
```

* 安装 Node 最新稳定版  
  
``` sh
$ n stable
```

* 安装指定的 Node 版本  

``` sh
$ n 10.13.0
```

* 删除已安装的 Node 版本

``` sh
$ n rm 10.13.0
```

* 切换 Node 版本  

``` sh
$ n 10.13.0
```

* 以指定的 Node 版本来执行脚本  

``` sh
$ n use 10.13.0  test.js
```

* 查看已安装 Node 版本  

``` sh
$ n ls
```

* 查看服务器上所有可用的 Node 版本  

``` sh
$ n ls-remote --all
```

## npm 镜像源切换

1. 查看当前 npm 镜像源

    ``` sh
    $ npm config list
    -------------------------
    ; "user" config from /Users/caigou/.npmrc

    registry = "https://registry.npm.taobao.org" 

    ; node bin location = /usr/local/bin/node
    ; node version = v20.11.0
    ; npm local prefix = /Users/caigou/Developer/artwebsite
    ; npm version = 10.2.4
    ; cwd = /Users/caigou/Developer/artwebsite
    ; HOME = /Users/caigou
    ; Run `npm config ls -l` to show all defaults.
    ```

2. 清空缓存

   ``` sh
   $ npm cache clean --force
   ```

3. 修改 npm 镜像源

   ``` sh
   $ npm config set registry https://registry.npmmirror.com
   ----------------------------------
   // https://registry.npmmirror.com 淘宝新的镜像源
   // https://registry.npmjs.org npm 官方源
   ```