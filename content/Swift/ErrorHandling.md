---
# 文章的标题
title: "错误处理"
# 文章的时间
date: 2023-04-11T09:31:40+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "文章描述"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverookArt"
---

## 表示错误  

> 错误用遵循 Error 协议的类型的值来表示。这个空协议表明该类型可以用于错误处理  
> Swift 的枚举类型尤为适合构建一组相关的错误状态，枚举的关联值还可以提供错误状态的额外信息

``` Swift
enum VendingMachineError: Error {
    case invalid //无效的
    case insufficient //不足的
    case outOfStock //缺货的
}
```

## 抛出错误  

> 抛出一个错误可以让你表明有意外情况发生，导致正常的执行流程无法继续执行。抛出错误使用 throw 语句

``` Swift
throw VendingMachineError.insufficient 
```

## throwing 函数 传递错误  

> 一个函数可以通过在声明中添加 throws 关键词来抛出错误消息  
> 一个标有 throws 关键字的函数被称作 throwing 函数  
> throwing 函数可以在其内部抛出错误，并将错误传递到函数被调用时的作用域
> 只有 throwing 函数可以传递错误。任何在某个非 throwing 函数内部抛出的错误只能在函数内部处理

``` Swift

func canThrowAnError() throws -> String {

}

```

## Do-Catch 处理错误

> 用一个 do-catch 语句运行一段闭包代码来处理错误  
> 在 do 子句中的代码抛出了一个错误，这个错误会与 catch 子句做匹配

``` Swift
do {
    try canThrowAnError()
    // 没有错误信息抛出
} catch {
    // 有错误信息抛出
}
```