---
# 文章的标题
title: "计算机硬件"
# 文章的时间
date: 2024-12-03T19:40:31+08:00
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

计算机硬件组成结构源于**冯·诺依曼**计算机结构。**冯·诺依曼**计算机结构将硬件划分为**5**部分：`控制器`、`运算器`、`存储器`、`输入设备`、`输出设备`。其中`控制器`与`运算器`以及其他的部件组成了`处理器`,`输入设备`和`输出设备`被集成为一体，按照**传输过程**被划分为`总线`、`接口`和`外部设备`。

``` mermaid
block-beta
    columns 3
    block:group1:1
        columns 1
        block:group2:1
            控制器
            运算器
        end
        存储器
    end
    blockArrow1<["接口"]>(x)
    block:group3:1
        columns 1
        输入设备 
        输出设备
    end
```

## 处理器

**处理器**(Central Processing Unit, CPU)是计算机系统`运算`与`控制`的核心部件。

* 能力构成：从运算、控制、发展到多级缓存、多种通信总线和接口

* 精简指令集 RISC(Reduced Instruction Set Computers): ARM, Power 
* 复杂指令集 CISC(Complex Instruction Set Computers): Intel, AMD x86

## 存储器

计算机系统中的存储器通常采用`分层体系结构`，按照与处理器的物理距离可分为4个层次：

| 层次 | 物理位置 | 结构 | 容量大小 |
| --- | --- | --- | --- |
| 片上缓存 | 处理器核心内 | SRAM | 较小16kB～512kB |
| 片外缓存 | 处理器核心外 | SRAM | 略大256kB~4MB |
| 主存(内存) | 独立的部件/芯片，通过总线与处理器连接 | DRAM | 100MB～GB |
| 外存 | 主板之外 | 半导体、磁、光 | 较大 GB～TB |

## 总线

## 接口

## 外部设备