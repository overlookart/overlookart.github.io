---
# 文章的标题
title: "属性包装器"
# 文章的时间
date: 2025-08-26T11:42:43+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "属性包装器"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

属性包装器（Property Wrapper）是 Swift 5.1 引入的一种语法特性，允许开发者通过自定义类型来封装属性的 getter、setter、存储和其他行为逻辑。属性包装器可以帮助实现属性的复用逻辑、统一校验、懒加载、持久化等场景。

## 实现

使用 `@propertyWrapper` 关键字定义一个属性包装器类型。属性包装器类型必须包含一个名为 `wrappedValue` 的属性，该属性定义了被包装属性的实际值。

``` swift
@propertyWrapper
struct MyPW {
    private var value: Int
    var wrappedValue: Int {
        get { value }
        set { value = newValue }
    }
}
```

## 使用

使用属性包装器时，在属性声明前加上 `@` 符号和属性包装器类型的名称。

``` swift
public struct Foo {
    @MyPW var bar: Int
}

func test() {
    var a = Foo()
    a.bar = 20
    debugPrint(a.bar)
}
```

在上面的示例中，`bar` 属性被 `MyPW` 属性包装器所包装。通过 `a.bar` 访问时，实际上是通过 `MyPW` 的 `wrappedValue` 属性进行读写操作。

