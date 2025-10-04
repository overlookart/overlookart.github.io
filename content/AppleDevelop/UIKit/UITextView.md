---
# 文章的标题
title: "UITextView"
# 文章的时间
date: 2024-06-28T10:09:52+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "文本域输入"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

## 常用的属性

* 设置统一样式属性

```swift
let textView = UITextView()

// 设置输入文字的样式属性
textView.typingAttributes = [
    .font: UIFont.systemFont(ofSize: 16),
    .foregroundColor: UIColor.black
]

// 设置链接文字的样式属性
textView.linkTextAttributes = [
   .foregroundColor: UIColor.blue,
   .underlineStyle: NSUnderlineStyle.single
]

// 设置键盘上的附加视图
textView.inputAccessoryView = UIToolbar(frame: CGRect(x: 0, y: 0, width: SCREEN_WIDTH, height: 44))
```

## 插入、删除、替换内容  

* 更新光标位置

```swift
public func updateCursorPosition(range: NSRange) {
    self.selectedRange = range
}
    
```

* 在光标位置插入属性字符串

```swift
public func insertAttrStringAtCursor(AttrString string: NSAttributedString) {
    // self: UITextView 自身
    // 插入属性文本到光标位置
    self.textStorage.insert(string, at: self.selectedRange.location)
    // 计算光标位置
    let cursorRange = NSRange(location: self.selectedRange.location + string.length, length: 0)
    // 更新光标位置 
    updateCursorPosition(range: cursorRange)
    // 调用自身的代理
    self.delegate?.textViewDidChange?(self)
}
```

* 在指定位置替换给定的属性字符串
  
```swift
public func replace(AttrString string: NSAttributedString, ForRange range: NSRange) {
    // 替换属性文本到指定位置
    self.textStorage.replaceCharacters(in: range, with: string)
    // 计算光标位置
    let cursorRange = NSRange(location: range.location + string.length, length: 0)
    // 更新光标位置
    updateCursorPosition(range: cursorRange)
    // 调用自身的代理
    self.delegate?.textViewDidChange?(self)
}
```

* 删除指定位置的内容

```swift
public func deleteAttrString(ForRange range: NSRange) {
    // 删除指定位置的属性文本
    self.textStorage.deleteCharacters(in: range)
    // 计算光标位置
    let cursorRange = NSRange(location: range.location, length: 0)
    // 更新光标位置
    updateCursorPosition(range: cursorRange)
    // 调用自身的代理
    self.delegate?.textViewDidChange?(self)
}
```

## 限制输入字符数量  

1. 遵守 UITextViewDelegate 协议
2. 实现 textView(_:shouldChangeTextIn:replacementText:) 方法

``` Swift
// 限制输入字符, 包括中文输入法
extension MyViewController: UITextViewDelegate {
    func textView(_ textView: UITextView, shouldChangeTextIn range: NSRange, replacementText text: String) -> Bool {
        guard let currentText = textView.text as NSString? else { return true }
        // 计算新文本内容
        let newText = currentText.replacingCharacters(in: range, with: text)         
        // 限制新文本内容的长度为12个字符
        return newText.count <= 12
    }
}
```

## 处理 link 点击事件

```swift
extension MyViewController: UITextViewDelegate {
    func textView(_ textView: UITextView, shouldInteractWith URL: URL, in characterRange: NSRange, interaction: UITextItemInteraction) -> Bool {
        // 处理链接点击事件
        print("链接被点击：\(URL)")
        return false // 返回 false 阻止默认行为
    }
}
```
