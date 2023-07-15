---
# 文章的标题
title: "EPUB"
# 文章的时间
date: 2023-07-15T16:02:28+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "Epub 电子书 的解析器和阅读器"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverookArt"
---

## Epub 解包器  

EPUB 文件其实是一个压缩包，使用压缩工具可将其解压，得到一个 EPUB 文件夹。

在 iOS 平台使用开源的解压缩工具库 SSZipArchive ，

``` shell
/-
 |-META-INF
  |-container.xml
```

/META-INF/container.xml 该文件始终存在，否则就是非法的 EPUB 文件，解析器会通过该文件逐步将 EPUB 文件内容解析出来。

## Epub 解析器  

根据 EPUB 文件夹结构来确定解析流程 ，需要解析的 EPUB 文件类型都是 XML 类型, 虽然有些文件的后缀不是 xml，但里面的内容都是由 xml 标签组成。

这里使用到的 XML 解析工具是 SwiftSoup，

## Epub 阅读器  
