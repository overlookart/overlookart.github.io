---
# 文章的标题
title: "增强输入"
# 文章的时间
date: 2023-11-19T10:02:20+08:00
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

## 项目配置

* 在项目中启用增强输入插件 (Enhanced Input Plugin)  
* 在项目的输入设置 Default Player Input Class 为 `EnhancedPlayerInput`, Default Input Component Class 为 `EnhancedInputComponent`

## 创建增强输入资产  

### 输入映射上下文  

输入映射向下文（Input Mapping Context） 将用户输入映射到输入动作，并可以动态地为每个用户添加、移除或安排优先次序。

### 输入动作  

输入动作（Input Actions） 是增强输入系统和项目代码之间的通信链接。要触发输入动作，必须将其包含在输入映射上下文中。

## 配置输入  

### 玩家控制器  

> 在 OnBeginPlay 的事件下为 增强输入本地玩家子系统(Enhanced Input Local Player Subsystem) 添加输入映射上下文  
>
> 蓝图节点 AddMappingContext 的参数  
>> Target 为控制器的增强输入本地玩家子系统  
>> MappingContext 为输入映射上下文资产  
>> Priority 优先级，值越大越优先响应

### Pawn 蓝图  

> 在玩家控制的 Pawn 蓝图中实现相关的增强输入操作事件

## 修饰器  

## 触发器  
