---
# 文章的标题
title: "Vue3 对 Dom 元素的引用"
# 文章的时间
date: 2023-02-27T11:13:38+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "文章描述"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate: 2023-02-27T11:13:38+08:00 
# 文章的发布时间  未到达发布时间不会发布到文章列表
publishDate: 2023-02-27T11:13:38+08:00
# 上次修改的日期
lastmod: 2023-02-27T11:13:38+08:00
# 作者
author: "OverookArt"
---

# Vue3中对Dom元素引用  

## 基本引用  

* 在 html 中设置要引用元素的 `ref`

``` HTML
<el-form ref="formRef"/>
```

* 在脚本中声明并使用  
  
``` javascript
// 声明对表单的引用
const formRef = ref();
//清除表单的验证字段
formRef.value.clearValidate(['name']);
```

## 高级引用  

* 在 html 中设置动态的 `ref`
  
``` HTML
<el-tree :ref="(el) => setTreeRef(el, index)"/>
```

* 在脚本中声明并使用

``` javascript
//声明存储引用的数组
var refTrees = [];
// 实现动态设置 ref 的方法,并将引用存储
const setTreeRef(el, index) => {
    // 判断 dom 元素是否有效
    if (el) {
        // 以 className 的方式为元素设置标记
        el.className = 'ref-tree-' + index;
        // 储存到引用数组中
        refTrees.push(el);
    }
}
// 使用动态引用
const useTreeRef(index) => {
    var refTree;
    refTrees.forEach((item) => {
        // 通过 className 获取dom
        if (item.className == 'ref-tree-' + index){
            refTree = item
        }
    });
    refTree.setCheckedKeys([checked],true);
}
```
