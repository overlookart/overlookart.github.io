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
// 获取 hugo 二进制的 git 提交哈希值
{{ printf "%#v" hugo.CommitHash }}
// 获取 hugo 二进制的编译时间
{{ printf "%#v" hugo.BuildDate }}
// hugo 是否是扩展版本
{{ printf "%#v" hugo.IsExtended }}
// hugo 运行的是否是生产环境
{{ printf "%#v" hugo.IsProduction }}
// 获取 hugo 项目的依赖项列表(hugo模块或本地主题组件)
{{ printf "%#v" hugo.Deps }}
// 获取 依赖性模块的信息
{{range $index, $element := hugo.Deps }}
    // 模块的路径
    {{ printf "<path:%#v>" $element.Path $index }}
    // 模块的版本号
    {{ printf "<Version:%#v>" $element.Version }}
    // 模块是否被供应
    {{ printf "<Vendor:%#v>" $element.Vendor }}
    // 模块的创建时间
    {{ printf "<Time:%#v>" $element.Time }}
    // 模块的引用者
    {{ printf "<Owner:%#v>" $element.Owner }}
{{end}}
```


## 创建一个数组  

``` js
{{ $array :=  slice "item1" "item2" "item3" }}
{{ printf "%#v" $array }}
```

## 为一个数组添加元素  

```js
{{ $array :=  slice "1" "2" "3" }}
{{ $n := $array | append "4" "5" }}
{{ printf "%#v" $n }}
// 打印结果: ["1","2","3","4","5"]

// 添加一个数组
{{ $n := $n | append (slice "6" "7") }}
{{ printf "%#v" $n }}
// 打印结果: ["1","2","3","4","5","6","7"]
```

## 取一个数组的后面几项  

``` js
{{ $array :=  slice "item1" "item2" "item3" }}
// 2 是下标 从下标往后取 并组成新的数组
{{ $last := after 2 $array }}
{{ $last }}
// 打印结果: [item3]
```

## 遍历 Array, Map  

``` js
// $index 绑定下标
// $item 绑定元素
{{range $index, $item := array }}
    {{ printf "<index:%#v item:%#v>" $index $item }}
{{end}}
```