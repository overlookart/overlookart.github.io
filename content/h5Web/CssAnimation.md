---
# 文章的标题
title: "CSS 动画"
# 文章的时间
date: 2024-11-13T10:38:34+08:00
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

## 基本概念

CSS Animations 可以使元素从一个 CSS 样式转换到另一个 CSS 样式。动画包括两个部分：描述动画的样式规则和动画的关键帧。 

* 使用 `animation` 属性指定动画关键帧名称、延迟时间、持续时间、重复次数、 动画速率等。
* 使用 `keyframes` 规则定义动画的关键帧，并设置动画的开始、结束、中间状态的样式。
  
## 动画属性

| 属性 | 描述 |
| --- | :--- |
| animation-name | 动画关键帧的名称 |
| animation-duration | 动画一个周期的时长 |
| animation-delay | 动画的延迟时间，即从元素加载完成之后到动画序列开始执行的这段时间 |
| animation-timing-function | 动画的速度曲线，设置动画在关键帧之间是如何变化 |
| animation-iteration-count | 动画的重复次数，可以指定 infinite 无限次重复动画 |
| animation-direction | 动画的播放方向，每次运行完后是反向运行还是重新回到开始位置重复运行 |
| animation-fill-mode | 动画的结束状态，动画执行前后如何为目标元素应用样式 |
| animation | 简写属性，用于设置以上所有动画属性 |

## 动画的关键帧

使用 `@keyframes` 和定义动画关键帧名称来建立两个或两个以上关键帧来实现。每一个关键帧都描述了动画元素在给定的时间点上应该如何渲染。通过 `from` 或 `0%` 指定动画的开始养生，`to` 或 `100%` 指定动画的结束样式。动画中间的关键帧可以用百分比来指定，例如 `50%` 表示动画的中间状态。

``` css
#nice h2:after {
    display: inline-block;
    content: var(--emoji-grinning);
    //vertical-align: bottom;
    // border-bottom: 36px solid #efebe9;
    // border-right: 20px solid transparent;
    animation-name: spin;
    animation-duration:  3s;
    animation-timing-function:  ease-in-out;
    animation-iteration-count:  infinite;
    animation-direction: alternate;
    @keyframes spin {
        from {
            transform: translateX(0) rotate(0deg);
        }
        
        to {
            transform: translateX(50vw) rotate(720deg);
        }
    }
}
```