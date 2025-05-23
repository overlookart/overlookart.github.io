---
# 文章的标题
title: "专家系统 ES"
# 文章的时间
date: 2025-02-16T10:28:01+08:00
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

## 概述

基于知识的专家系统简称为专家系统。是人工智能的一个重要分支。专家系统的能力来自于它所拥有的专家知识、知识的表示及推理的方法则提供了应用的机理。

专家系统不同于传统的应用程序和其他类型的人工智能问题求解程序，主要表现在下面5个方面：

1. 专家系统属于人工智能的范畴，其`求解的问题是半结构或非结构化的问题`。
2. 专家系统模拟的是`人类专家在问题领域的推理`，而不是模拟问题领域本身。
3. 专家系统由3个要素组成：`描述问题状态的综合数据库`、`存放启发式经验知识的知识库`、`对知识库的知识进行推理的推理机`。三要素分别对应`数据级`、`知识库级`和`控制级`三级知识，而传统应用程序只有数据和程序两级。
4. 专家系统处理的问题是`实际问题`，而不是纯学术问题。
5. 从求解手段来看，专家系统`专用性强`、`通用性差`。

人工智能(AI)是指利用机械、电子、光电或生物器件等制造的装置或机器模仿人类的智能，其研究重点放在开发具有智能行为的计算机系统上，智能行为表现出以下5个特点：

1. 从过去的事件或情形中汲取经验，并将从经验中得到的知识应用与新的环境和场景中。
2. 具有在缺乏重要信息时的解决问题能力。
3. 具有处理和操纵各种符号、理解形象化图片的能力。
4. 具有想象力和创造力。
5. 善于启发。

人工智能是一个极为广泛的领域，人工智能的主要分支有：`专家系统`、`机器人技术`、`视觉系统`、`自然语言处理`、`学习系统`和`神经网络`。

## 特点

* 超越时间限制
* 操作成本低廉
* 易于传递与复制
* 处理手段一致(不会因人而异)
* 善于克服难题
* 适用特定领域

## 组成

1. 知识库：用来`存放系统求解实际问题的领域知识`。知识库中的知识分为两类：事实性知识、启发性知识。
2. 综合数据库：专家系统在`执行与推理过程中用来存放所需要和产生的各种信息的工作存储器`。综合数据库又叫动态知识库，其内容在系统运行过程中是不断变化的。把专家的知识库称为静态知识库，二者一起构成完整的知识库。
3. 推理机：`推理机和知识库一起构成专家系统的核心`。推理机也被称为控制结构或规则的解释器，通常包括推理机和控制策略，是一组用来控制系统的运行、执行各种任务、根据知识库进行各种搜索和推理的程序模块。
4. 知识获取：主要有两方面功能：`编辑和求精`、`知识自学习`。
5. 解释程序：是面向用户服务的，`负责解答用户提出的各种问题`。
6. 人机接口：通常包括两部分：`专家系统与用户的接口`、`专家系统与领域专家和知识工程师的接口`。