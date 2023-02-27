---
# 文章的标题
title: "Sortablejs+ElTable 拖拽"
# 文章的时间
date: 2023-02-27T11:29:51+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "文章描述"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate: 2023-02-27T11:29:51+08:00 
# 文章的发布时间  未到达发布时间不会发布到文章列表
publishDate: 2023-02-27T11:29:51+08:00
# 上次修改的日期
lastmod: 2023-02-27T11:29:51+08:00
# 作者
author: "OverookArt"
---

# Sortablejs+ElTable 拖拽  

element plus + sortablejs 实现表格拖拽功能  

## 安装 sortablejs  

``` shell
$ npm i sortablejs --save
```

## 在 Vue 中引入 sortablejs

``` js
import Sortable from "sortablejs"
```

## 为拖拽的 table 配置 ref 和 row-key  

``` js
<el-table :data="datas" ref="dragTable" row-key="dragTable">
</el-table>
const dragTable = ref();
```

## 创建拖拽表格实例  

``` js
const createDragTable = () => {
    //引用的元素 通过 css 选择器 查到 table 元素
    var table = dragTable.value.$el.querySelector('.el-table__body-wrapper tbody');
    if(!table){
        return;
    }
    //创建表格拖拽
    var dTable = Sortable.create(table, {
        animation:150,
        onStart: () => {
            //开始拖拽
        },
        onMove: (val) => {
            /**
             * 拖拽中
             * val.dragged.rowIndex 正在拖拽行的下标
             * val.related.rowIndex 预计拖拽后行的下标
             */
            //第一行不可拖到其他行，其他行也不可拖到第一行
            if(val.dragged.rowIndex == 0 || val.related.rowIndex == 0){
                return false;
            }
        },
        onEnd: (el) => {
            console.debug('结束拖拽',el.showIndex);
        }
    });
}
```

## 在 onMounted 方法中调用

```js
onMounted(() => {
    createDragTable();
});
```
