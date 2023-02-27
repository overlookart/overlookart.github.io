---
# 文章的标题
title: "Hugo Functions"
# 文章的时间
date: 2023-02-27T17:55:54+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "文章描述"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate: 2023-02-27T17:55:54+08:00 
# 文章的发布时间  未到达发布时间不会发布到文章列表
publishDate: 2023-02-27T17:55:54+08:00
# 上次修改的日期
lastmod: 2023-02-27T17:55:54+08:00
# 作者
author: "OverookArt"
---

# Hugo 模版中的方法  

## Hugo 的相关数据  

``` go
// 生成 hugo 版本的 <meta> 标签
{{printf "%#v" hugo.Generator}}
// 获取 hugo 的版本号
{{ printf "%#v" hugo.Version }}
// 获取构建 hugo 的 go语言的版本号
{{ printf "%#v" hugo.GoVersion }}
// 获取 hugo 当前运行环境
{{ printf "%#v" hugo.Environment }}
```


## 创建一个数组  

``` js
{{ $array :=  slice "item1" "item2" "item3" }}
{{ printf "%#v" $array }}
```

