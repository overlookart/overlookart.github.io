---
# 文章的标题
title: "CSS 中的单位"
# 文章的时间
date: 2025-04-22T09:25:35+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "在 CSS 中，单位用于定义长度、尺寸、时间等属性的值"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

## 长度单位

长度单位用于定义宽度、高度、边距、内边距等属性。分为**绝对单位**和**相对单位**。

绝对单位的大小是固定的，不会根据上下文变化。

* **cm**：厘米（centimeters）
* **mm**：毫米（millimeters）
* **in**：英寸（inches）1 in = 2.54 cm = 96 px
* **px**：像素（pixels），屏幕上的一个点
* **pt**：点（points）1 pt = 1/72 in
* **pc**：派卡（picas）1 pc = 12 pt

相对单位的大小依赖于上下文，如父元素或根元素的大小。

* **%**：相对于父元素的大小
* **em**：相对于父元素字体大小
* **rem**：相对于根元素字体大小
* **vw**：视口宽度的 1%（viewport width）
* **vh**：视口高度的 1%（viewport height）
* **vmin**：视口宽度和高度的较小值的 1%
* **vmax**：视口宽度和高度的较大值的 1%
* **ex**：相对于当前字体中小写字母 x 的高度
* **ch**：相对于当前字体中数字 0 的宽度

``` css
.container {
  width: 80%; /* 相对单位 */
  height: 200px; /* 绝对单位 */
  margin: 1em; /* 相对单位 */
  font-size: 16px; /* 绝对单位 */
}
```

## 时间单位

用于定义动画和过渡的持续时间

* s：秒（seconds）
* ms：毫秒（milliseconds）

1 s = 1000 ms

``` css
.animation {
  animation-duration: 2s;
  transition-delay: 500ms;
}
```

## 角度单位

用于定义旋转、渐变角度等。

* **deg**：度数（degrees），一个完整的圆为 360 度
* **rad**：弧度（radians），一个完整的圆为 2π 弧度
* **grad**：梯度（gradians），一个完整的圆为 400 梯度
* **turn**：圈数，一个完整的圆为 1 turn

``` css
.rotate {
  transform: rotate(45deg);
}
```

## 分辨率单位

用于定义设备分辨率：

* **dpi**：每英寸的点数（dots per inch）
* **dpcm**：每厘米的点数（dots per centimeter）
* **dppx**：每像素的点数（dots per pixel）

1 dppx = 96 dpi

``` css
@media (min-resolution: 300dpi) {
  body {
    font-size: 18px;
  }
}
```