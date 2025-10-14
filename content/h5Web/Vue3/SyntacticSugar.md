---
# 文章的标题
title: "语法糖"
# 文章的时间
date: 2025-10-14T09:40:25+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "Vue 3 引入了组合式 API 和其他新特性，使得开发者可以使用更简洁和直观的语法来编写 Vue 组件。"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

## 双向绑定

在自定义组件中，你可以通过 `emit('update:modelValue', newValue)` 来通知父组件更新绑定的 **v-model** 的值。这样父组件上的 v-model="xxx" 所对应的 xxx 就会变成 newValue。


例如，你有一个弹窗组件，关闭时希望通知父组件关闭它：

```vue
<script setup>
const emit = defineEmits(['update:modelValue'])

function closeDialog() {
  emit('update:modelValue', false) // 通知父组件关闭弹窗
}
</script>
```

在父组件中，你可以这样使用：

```vue
<MyDialog v-model="showDialog" />
```
当你在子组件中调用 emit('update:modelValue', false) 时，父组件的 showDialog 就会变为 false。