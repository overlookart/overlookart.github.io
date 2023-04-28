---
# 文章的标题
title: "Block 与 Closure"
# 文章的时间
date: 2023-04-26T10:48:26+08:00
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

## OC 的 Block 与 Swift 的 Closure  

### 相互转化  

1. Closure 转 Block  

    ``` Swift
    let closure: (String) -> Void = { str in
        
    }
    let block = closure as @convention(block) (String) -> Void
    let blockObject = unsafeBitCast(block, to: AnyObject.self)
    ```

2. Block 转 Closure  

    ``` Swift
    typealias closureType = @convention(block) (String) -> Void
    // OC_block 为 OC 定义的 block
    let closure = unsafeBitCast(OC_block as AnyObject, to: closureType.self)
    ```
