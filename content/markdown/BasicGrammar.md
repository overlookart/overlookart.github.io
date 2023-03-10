---
title: "markdown 基本语法"
date: 2023-02-18T21:39:09+08:00
author: "overlookart"
description: "Markdown 语法"
draft: false
---

# [`# `]标题语法
## [`## `]二级标题
### [`### `]三级标题
#### [`#### `]四级标题 最小到六级标题 注意空格
[可选]一级标题语法
====
[可选]二级标题语法
----


# 换行语法
> 在一行的末尾添加两个或多个空格，然后按回车键,即可创建一个换行

# 段落语法
> 使用空白行 将一行或多行文本进行分隔

# 引用语法
> [`> `]引用语法注意空格  
> 多段落引用 为段落之间的空白行添加一个[`> `]
>> [`>> `]多级引用
>>> [`>>> `]多级引用

# 强调语法
## 粗体
> 单词或短语的前后各添加[`**`]或[`__`] **加粗1** __加粗2__  
> 在单词或短语中间部分加粗的话，请使用[`**`]
 
## 斜体
> 在单词或短语前后添加[`*`]或[`_`] *斜体1* _斜体2_  
> 在单词或短语中间部分加粗的话，请使用[`*`] 我的小*斜体*呀

## 粗体+斜体
> 在单词或短语的前后各添加`***`或`___` ***粗斜体1*** ___粗斜体2___  
> 在单词或短语中间部分加粗斜体的话，请使用[`***`] 我加了一个***粗斜***体
## 删除
> 单词或短语的前后各添加[`~~`]
> ~~删除~~

# 列表
## 有序列表
> 在每个列表项前添加[`1. `]。数字不必按数学顺序排列，但是列表应当以数字 1 起始,注意空格
1. 第一项
    1. 第一小项
        1. 继续往下延伸
            1. 还能继续吗
2. 第二项

## 无序列表
> 在每个列表项前面添加[`- `]、[`* `] 或[`+ `] 。缩进一个或多个列表项可创建嵌套列表，注意空格  
> 处理同一列表中的不同分隔符。为了兼容性，不要在同一级列表中混合和匹配分隔
- 我是一张弓
    * 开弓没有回头箭
        + 让箭飞一会
- 站似一棵树
## 定义列表
> 定义列表:在第一行上键入术语。在下一行，键入一个冒号，后跟一个空格和定义

First Term
: This is the definition of the first term.

Second Term
: This is one definition of the second term.
: This is another definition of the second term.

## 任务列表
> 任务列表使您可以创建带有复选框的项目列表
> 创建任务列表:在任务列表项之前添加破折号-和方括号[ ]，并在[ ]前面加上空格。要选择一个复选框，请在方括号[x]之间添加 x
- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

# 代码
## 单行代码
> 要将单词或短语表示为代码，请将其包裹在反引号中  

```
`var count = 0`
```
`var count = 0`
## 多行代码
> 将代码块的每一行缩进至少四个空格或一个制表符 或用前后三个反引号
 
    public func setup(data:Any){
        
    }
``` 
[```]  
public func setup(data:Any){

}
[```]
```
## 代码语法高亮
> 许多Markdown处理器都支持受围栏代码块的语法突出显示。
> 在受防护的代码块之前的反引号旁边指定一种语言。
``` json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```
## 转义反引号
> 如果你要表示为代码的单词或短语中包含一个或多个反引号，则可以通过将单词或短语包裹在双反引号  

``Use Your `Code` in Markdown File``




# 分割语法 
> 在单独一行上使用三个或多个星号 [`***`]、破折号 [`---`] 或下划线 [`___`] ，并且不能包含其他内容  
---
***

# 链接语法
> 链接文本放在中括号内，链接地址放在后面的括号中，链接title可选  `[超链接显示名称](超链接地址 "链接title是当鼠标悬停在链接上时会出现的文字")` title是可选的  
[Markdown语法](https://markdown.com.cn "Markdown语法")
## 网址和Email地址
> 使用尖括号可以很方便地把URL或者email地址变成可点击的链接
<https://markdown.com.cn> , <markdown@example.com>
## 格式化链接
> 强调链接, 在链接语法前后增加星号。 要将链接表示为代码，请在方括号中添加反引号  
I love supporting the **[EFF](https://eff.org)**.  
This is the *[Markdown Guide](https://www.markdownguide.org)*.  
See the section on [`code`](#code).

## 引用类型链接
# 图片语法
## 普通图片
> `![替代文本](图片地址 "图片标题")`
> ![这是图片](https://markdown.com.cn/hero.png "图片标题")
## 链接图片
> `[![替代文本](图片地址 "图片标题")](https://markdown.com.cn)`
> [![这是图片](https://markdown.com.cn/hero.png "图片标题")](https://markdown.com.cn)

# 转译字符语法
## 普通字符转译
> 要显示原本用于格式化 Markdown 文档的字符，请在字符前面添加反斜杠字符 \
> `\\`,`\*`,`\_`,`\{}`,`\[]`,`\()`,`\#`,`\+`,`\-`,`\.`,`\!`,`\|`
## 特殊字符转译
> 在 HTML 文件中，有两个字符需要特殊处理： < 和 &
> < 符号用于起始标签，& 符号则用于标记 HTML 实体
> 你必须要使用实体的形式，是 &lt; 和 &amp;

# 内嵌 HTML 语法
## 行级标签
> HTML 的行级內联标签如 `<span>`、`<cite>`、`<del>` 不受限制，可以在 Markdown 的段落、列表或是标题里任意使用
> This **word** is bold. This <em>word</em> is italic.
## 块级标签
> 区块元素──比如 `<div>`、`<table>`、`<pre>`、`<p>` 等标签，必须在前后加上空行，以便于内容区分  
```
<table>
    <tr>
        <td>Foo</td>
    </tr>
</table>
```
<table>
    <tr>
        <td>Foo</td>
    </tr>
</table>

# 表格
## 基础表格
> 要添加表，请使用三个或多个连字符（---）创建每列的标题，并使用管道（|）分隔每列。您可以选择在表的任一端添加管道
```
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |
```

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

## 内容对齐
> 您可以通过在标题行中的连字符的左侧，右侧或两侧添加冒号（:），将列中的文本对齐到左侧，右侧或中心
```
| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |
```
## 格式化文字
> 您可以在表格中设置文本格式。例如，您可以添加链接，代码（仅反引号（`）中的单词或短语，而不是代码块）和强调
> 不能添加标题，块引用，列表，水平规则，图像或HTML标签

# 脚注语法
## 说明
> 脚注使您可以添加注释和参考，而不会使文档正文混乱
> 带有脚注的上标数字会出现在添加脚注参考的位置,可以单击链接以跳至页面底部的脚注内容
> 方括号`[^1]`内添加插入符号和标识符。标识符可以是数字或单词，但不能包含空格或制表符
> 标识符仅将脚注参考与脚注本身相关联-在输出中，脚注按顺序编号
>
## 示例
```
Here's a simple footnote,[^1] and here's a longer one.[^bignote]
[^1]: This is the first footnote.
[^bignote]: bignote
```

# Emoji 表情



# 目录语法
[TOC]

# 标签语法

# 流程图
```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
