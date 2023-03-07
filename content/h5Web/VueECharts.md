---
# 文章的标题
title: "VueECharts"
# 文章的时间
date: 2023-03-06T17:55:48+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "文章描述"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate: 2023-03-06T17:55:48+08:00 
# 文章的发布时间  未到达发布时间不会发布到文章列表
publishDate: 2023-03-06T17:55:48+08:00
# 上次修改的日期
lastmod: 2023-03-06T17:55:48+08:00
# 作者
author: "OverookArt"
---

> [echarts 官网]("https://echarts.apache.org/zh/index.html")  
# 基于VUE3 下的 ECharts  



## 安装  

``` shell
# 安装必要依赖 @vue/composition-api
$ npm i -D @vue/composition-api  
# 安装 echarts
$ npm install echarts vue-echarts
```

## 使用  

``` vue
<template>
    <div>
        <v-chart style="height: 400px;" :option="option" />
    </div>
</template>
<script setup>
// 导入基于 VUE 的 echarts 组件
import VChart from "vue-echarts";
// 导入 echarts 核心模块，该模块为使用 echarts 提供必要的接口。
import * as echarts from "echarts/core";
// 导入 echarts 折线图或者其他图表, 全部图表使用 Chart
import { LineChart } from "echarts/charts";
// 导入矩形坐标系组件，全部组件使用 Component
import { GridComponent } from "echarts/components"
// 导入 echarts 画布渲染器
import { CanvasRenderer } from "echarts/renderers";
// 注册 echarts 所需要的组件
echarts.use([LineChart, GridComponent, CanvasRenderer]);
// 为相应的组件配置参数及数据
const option = ref({
    // ⚠️⚠️⚠️ 配置什么参数就需要导入相应的组件

    // GridComponent 组件需要的参数
    xAxis: {// x轴
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [ //图表数据源
        {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
        }
    ]
})
</script>
```

## 常用组件  

``` vue
<script>
import { 
    GridComponent, //二维坐标系组件 
    LegendComponent, //图例组件
    TooltipComponent, //数据提示组件
} from "echarts/components"
</script>
```