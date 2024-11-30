---
# 文章的标题
title: "开源协议 License"
# 文章的时间
date: 2024-11-30T20:29:37+08:00
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
author: "OverLookArt"
---

``` mermaid
mindmap
    root ((
        Open Source License
        是否保留署名权
    ))
        无署名权
            严肃的协议
                简单
                    )Unlicense(
                详细
                    )CCO(
            宽松的协议
                )WTFPL(
        有署名权
            能修改源代码，二次分发
                修改后能否闭源
                    能闭源 
                        需要专利授权和 logo 保护
                            )Apache License 2.0(
                        不用专利授权和 logo 保护
                            是否担心有人利用或自己机构的声誉来谋取不当利益
                                担心
                                    )BSD 3-clause(
                                不担心
                                    )MIT(
                    部分闭源
                        )MPL 2.0(
                    不能闭源
                        别人引入这个项目作为依赖时，是否需要相同或兼容的许可协议
                            需要
                                网络服务是否也算入依赖
                                不算
                                    )GPL 3.0(
                                算
                                    )AGPL 3.0(
                            不需要
                                )LGPL(
            不能修改源代码，二次分发
                不符合OSI开源协议
                    )CC BY-NC-SA-ND(
                    使用附加许可
                        )Commons Clause(
```