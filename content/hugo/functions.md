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

## 基础数据  

### 创建一个整数  

``` js
// 通过字面量创建
{{ $int := 123 }}
// 通过参数创建
{{ $int := int "123" }}
{{ $int }}
// 输出结果: 123
```

### 创建一个浮点数  

``` js
// 通过字面量创建
{{ $float := 1.32 }}
// 通过参数创建
{{ $float := float "1.32"}}
{{ $float }}
// 输出结果: 1.32
```

## 数组  

### 创建一个数组  

``` js
{{ $array :=  slice "item1" "item2" "item3" }}
{{ printf "%#v" $array }}
```

### 为一个数组添加元素  

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

### 数组中是否存在某个元素

``` js
{{ $array :=  slice "item1" "item2" "item3" }}
{{ in $array "item4" }}
// 输出结果: false
```

### 通过下标取数组的元素

``` js
{{ $array :=  slice "item1" "item2" "item3" }}
{{ index $array 1 }}
// 输出结果: item2
```

### 取一个数组的前几项

``` js
{{ $array :=  slice "item1" "item2" "item3" }}
// 从数组中取前2项元素，并组成新数组
{{ $first := first 2 $array }}
{{ $first }}
// 打印结果: [item1 item2]
```

### 取一个数组的后几项  

``` js
{{ $array :=  slice "item1" "item2" "item3" }}
// 2 是下标 从下标往后取 并组成新的数组
{{ $after := after 2 $array }}
{{ $after }}
// 打印结果: [item3]
```

### 合并两个数组  

``` js
{{ $array1 :=  slice "item1" "item2" "item3" }}
{{ $array2 :=  slice "item1" "A" "item3" }}
// 将两个数组的相同元素作为新数组, 顺序与第一个数组相同
{{ intersect $array1 $array2 }}
// 输出结果: [item1 item3]
```

### 遍历 Array, Map  

``` js
// $index 绑定下标
// $item 绑定元素
{{range $index, $item := array }}
    {{ printf "<index:%#v item:%#v>" $index $item }}
{{end}}
```

## 字典  

### 创建一个字典

``` js
{{ $dic := dict "key" "value" }}
{{ printf "%#v" $dic }}
// 打印结果: {"key":"value"}
```

### 通过 key 取 value  

``` js
{{ $dic := dict "key" "value" }}
{{ $dic.key }}
// 或者
{{ index $dic "key" }}
// 输出结果: value
```

### 将字典转为JSON

``` js
{{ $dic := dict "key" "value" }}
{{ jsonify $dic}}
// 输出结果: {"key":"value"}
```

## 数据嵌套  

## 流程控制  

### 条件判断  

``` js
// 如果 val1 与 val2 相等, 则...
{{ if eq val1 val2 }}
// 如果 val1 大于等于 val2, 则...
{{ if ge val1 val2 }}
// 如果 val1 大于 val2, 则...
{{ if gt val1 val2 }}

{{ end }}
```

## 错误日志  