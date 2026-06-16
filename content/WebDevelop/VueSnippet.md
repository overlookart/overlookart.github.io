---
# 文章的标题
title: "VueSnippet"
# 文章的时间
date: 2023-03-27T16:23:02+08:00
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
author: "OverookArt"
---

## Vue2 的代码块

``` vue
<!--
* @Author: xzh
* @Date: 2021-05-21 00:31:25
* @LastEditTime: 2021-05-21 10:09:32
* @LastEditors: xzh
* @Description: 组件描述
* @FilePath: /文件路径.vue
* 代码版权方：'政府采购信息网'
-->
<template>
 <div class="">
 
 </div>
</template>
 
<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
export default {
    components: {},
    props: [],
    data () {
      return {
        
      }
    },
// 监听属性 类似于data概念
    computed: {}, 
// 监控data中的数据变化
    watch: {},
// 方法集合
    methods: {},
/*------生命周期-------*/
//创建完成（可以访问当前this实例）
    created() {},
//挂载完成（可以访问DOM元素）
    mounted() {},
//创建之前
    beforeCreate() {},
//挂载之前
    beforeMount() {},
//更新之前
    updated() {},
//销毁之前
    beforeDestroy() {},
//销毁完成
    destroyed() {},
//如果页面有keep-alive缓存功能，这个函数会触发
    activated() {},
};
</script>
 
<style lang="stylus" scoped>
// @import url(); 引入公共css类
</style>

```  

## Vue3 的代码块  

``` vue
<!--
* @Author: xzh
* @Date: 2021-05-21 00:31:25
* @LastEditTime: 2021-05-21 10:09:32
* @LastEditors: xzh
* @Description: 组件描述
* @FilePath: /文件路径.vue
* 代码版权方：'丫丫'
-->
<template>
<dev>{{data.param}}</dev>
</template>

// 路由守卫 这里可以路由跳转时的参数
<script >
import { defineComponent } from 'vue'
export default defineComponent({
  beforeRouteEnter(to, from, next) {
    console.debug('路由守卫:beforeRouteEnter');
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.debug('路由守卫:beforeRouteLeave',from.params);
    to.params.isReload = from.params.isReload;
    next();
  }
});
</script>

<script setup>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// 引入数据处理
import { reactive, ref, watch,  defineProps, computed } from 'vue'
// 引入生命周期函数
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated,
onBeforeUnmount, onUnmounted, onActivated, onDeactivated,
onErrorCaptured, onRenderTriggered, onRenderTracked} from 'vue'
// props 接收父组件传来的值
const props = defineProps({});
// 声明回调事件
const emit = defineEmits(['blockAct']);
var v = ref('');
//
var data = reactive({
    param:'xzh',
});
// 监控data中的数据变化, 不使用监听不实例话监听方法
// watch(() => {});
/*------生命周期-------*/
//创建之前 //beforeCreate
//创建完成 //create
//挂载之前
onBeforeMount(() => {});
//挂载完成（可以访问DOM元素）
onMounted(() => {});
//更新之前
onBeforeUpdate(() => {});
//更新完成
onUpdated(() => {});
//销毁之前
onBeforeUnmount(() => {});
//销毁完成
onUnmounted(() => {});
//如果页面有keep-alive缓存功能，这个函数会触发
onActivated(() => {});
onDeactivated(() => {});
onErrorCaptured(() => {});
onRenderTriggered(() => {});
onRenderTracked(() => {});
</script>
<style lang="scss"  scoped>
// @import url(); 引入公共css类
</style>

```  
