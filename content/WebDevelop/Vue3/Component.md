---
# 文章的标题
title: "组件"
# 文章的时间
date: 2025-10-16T15:59:02+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "Vue 3 组件系统允许开发者创建可复用的 UI 组件，支持组合式 API 和选项式 API，使得组件的定义和使用更加灵活和高效。"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

## Slot 插槽

在 Vue 3 中，[插槽（Slot）](https://cn.vuejs.org/guide/components/slots.html)是一种允许你在组件中定义占位符，以便在使用组件时传入模版内容的机制。插槽使得组件更加灵活和可复用。

### 默认插槽

声明默认插槽非常简单，只需在组件的模板中使用 `<slot></slot>` 标签即可。如果没有传入任何内容，插槽会显示默认内容。

``` vue
<!-- CustomView.vue -->
<template>
    <div>
        <slot>默认插槽</slot>
    </div>
</template>
```

在父组件中使用该组件时，可以传入自定义内容：

``` vue
<!-- ParentComponent.vue -->
<template>
    <div>
        <CustomView>
            <p>这是传入的插槽内容</p>
        </CustomView>
    </div>
</template>
```

### 具名插槽

具名插槽允许你在组件中定义多个插槽，并通过名称来区分它们。这样可以让父组件更灵活地传入内容。

``` vue
<!-- CustomView.vue -->
<template>
    <div>
        <header>
            <slot name="header">默认头部内容</slot>
        </header>
        <main>
            <slot>默认主体内容</slot>
        </main>
        <footer>
            <slot name="footer">默认底部内容</slot>
        </footer>
    </div>
</template>
```

在父组件中使用具名插槽：

``` vue
<!-- ParentComponent.vue -->
<template>
    <div>
        <CustomView>
            <template #header>
                <h1>这是自定义头部</h1>
            </template>
            <p>这是自定义主体内容</p>
            <template #footer>
                <p>这是自定义底部</p>
            </template>
        </CustomView>
    </div>
</template>
```

### 数据传递

在某些场景下父组件需要使用子组件内的数据，这时可以通过 **作用域插槽**（scoped slots）来实现。可以像对组件传递 props 那样，向一个插槽的出口上传递数据。

``` vue
<!-- CustomView.vue -->
<template>
    <div>
        <slot :data="message">默认插槽</slot>
    </div>
</template>

<script setup>
const message = "这是来自子组件的数据"
</script>
```

在父组件中使用作用域插槽：

``` vue
<!-- ParentComponent.vue -->
<template>
    <div>
        <CustomView #default="{ data }">
            <p>子组件传递的数据: {{ data }}</p>
        </CustomView>
    </div>
</template>
```

> [!Note]
> 为具名插槽传递数据的插槽称为：**名作用域插槽**。可以为特定的插槽传递不同的数据。
