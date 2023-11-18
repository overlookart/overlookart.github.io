---
# 文章的标题
title: "HUGO 自定义主题"
# 文章的时间
date: 2023-02-26T00:02:48+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "文章描述"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate: 2023-02-26T00:02:48+08:00 
# 文章的发布时间  未到达发布时间不会发布到文章列表
publishDate: 2023-02-26T00:02:48+08:00
# 上次修改的日期
lastmod: 2023-02-26T00:02:48+08:00
# 作者
author: "OverookArt"
--- 
## 创建一个主题  

``` shell
# 在项目根目录下执行
$ hugo new theme [newTheme] 
#会在项目的theme文件夹下创建对应名字的主题, 例如：/theme/newTheme/

# 在配置文件设置新创建的主题 /config.toml
theme = 'newTheme' #启动项目后生效
```

## 文件结构说明  

``` shell
./theme # 项目的主题目录
    |__newTheme #新建的主题目录
        |__archetypes #新建页面时的扉页模版
            |__default.md #默认的扉页模版
            |__posts.md # 在 posts 分组下新建页面的扉页模版 优先级比 default 高
        |__assets # Hugo Pipes 的资源(css, js),通过.Permalink,.RelPermalink 引用发布到项目 public
            |__style.css # 主题用到的 css 文件
        |__layout #页面的模版文件
            |__default # 页面默认默认模版位置
                |__baseof.html #站点的主框架,首先要加载的内容
                |__index.html #首页模版 Kind 为 home 的页面会匹配该模版
                |__list.html #分组模版 Kind 为 section 的页面会匹配该模版
                |__single.html #单页面模版 Kind 为 page 的页面会匹配该模版
            |__partials # 放一些子模块
        |__static #主题使用到的 img...
        |__theme.toml #主题配置文件
```

## 应用主题  

在配置文件中配置主题  

``` toml
<!-- config.toml -->
theme = 'newTheme'
```

## Hugo Theme 是如何工作的？

### 页面加载流程

1. 加载主题内站点的主框架 baseof.html
2. 根据页面的 `Kind` 属性匹配 /layout 下面的模版文件  
    | Page.Kind | Template |
    |-----------|----------|
    |home|index.html|
    |section|list.html|
    |page|single.html|
3. 执行模版文件的模版语法 加载相应的子模块
4. 生成完整的静态页面

### 匹配模版的优先级  

- /layout 的优先级 高于 /theme/newTheme/layout  

## css 文件引用

- css 样式文件位于 ./assets 文件夹内
- 站点使用的样式文件一般在 head 标签内引入
- ./layout/_default/baseof.html 站点框架文件包含完整的html格式 head 和 body
- 将 head 部分模块化为 ./layout/partials/head.html
- 在 head 模块内引入 css 样式文件
  
  ``` templates
    {{ $style := resources.Get "scss/style.scss" }}
    {{ $a := $style | resources.ToCSS }}
    <link rel="stylesheet" href="{{ $a.Permalink }}">
  ```

- 在模版文件的元素就可以使用相应的样式了
  
## 使用 Tailwind CSS 框架

1. 通过 Node Package Manager 管理三方依赖库

    ```shell
    # 在自定义主题文件夹下执行
    $ npm init -y
    ```

2. 安装Tailwind CSS 依赖库

    ``` shell
    $ npm install -D tailwindcss
    ```

3. 初始化 Tailwind CSS

    ``` shell
    $ npx tailwindcss init
    ```

4. 配置模板路径

    ``` js
    //tailwind.config.js
    module.exports = {
        //在tailwind.config.js文件中添加所有模板文件的路径。
        content: ['content/**/*.md', 'layouts/**/*.html'],
    }
    ```

5. 将Tailwind指令添加到 tailwind.css 中

    ``` css
    @tailwind base;
    @tailwind components;
    @tailwind utilities
    ```

6. 在package.json, 在scripts 部分添加build和watch命令  
   运行CLI工具来扫描模板文件的类并构建CSS。  

    ``` json
    "scripts": {
        // 编译 ./tailwind.css 文件输出到 ./assets/style.css
        "build": "npx tailwindcss -i ./tailwind.css -o ./assets/style.css",
        // 监听页面使用的 css ,实时更新到 ./assets/style.css
        "watch": "npx tailwindcss -i ./tailwind.css -o ./assets/style.css --watch"
    }
    ```  

7. 自定义 tailwind 的值时需要监听

    ``` shell
    $ npm run watch
    ```

8. 打包部署前 编译 ./tailwind.css

    ``` shell
    $ npm run build
    ```

9. 在 head 里面引用编译好的样式文件

    ``` html
    <!--  注意 文件的路径为编译后输出到 ./ assets/ 下的路径 -->
    {{ $tailwindcss := resources.Get "style.css" }}
    <link rel="stylesheet" href="{{ $tailwindcss.Permalink }}">
    ```

10. markdown 语法插件 typography  

    ``` shell
        # 需要引入 tailwindcss 的插件
        npm install -D @tailwindcss/typography
        # 在模版语法 {{ .Content }} 的外层元素使用 class prose
        <article class="prose">
            {{ .Content }}
        </article>
        # class 灰度 prose-gray prose-slate prose-zinc prose-neutral prose-stone
        # class 大小 prose-sm prose-base prose-lg prose-xl prose-2xl
        # class 适应深色模式 dark:prose-invert
        # class 修改单个元素样式 prose-headings:underline prose-a:text-blue-600
        # 元素指示器 详见 https://tailwindcss.com/docs/typography-plugin#element-modifiers
    ```
