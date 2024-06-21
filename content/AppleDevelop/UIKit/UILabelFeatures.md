---
# 文章的标题
title: "UILabelFeatures"
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

> UILabel 功能扩展  

## 高亮显示文字 

``` Swift
import UIKit
extension UILabel {
    /// 高亮显示文字
    /// - Parameters:
    ///   - subString: 需要高亮显示的文字
    ///   - color: 高亮显示的颜色
    /// - Returns: 返回可修改的属性字符串
    func highlight(SubString subString:String, Color color: UIColor) -> NSMutableAttributedString? {
        /// 如果没有文本 返回nil
        guard let textStr = self.text else { return nil }
        
        var mastr:NSMutableAttributedString!
        if let aStr = self.attributedText {
            mastr = NSMutableAttributedString(attributedString: aStr)
        }else{
            mastr = NSMutableAttributedString(string: textStr, attributes: [.font:self.font, .foregroundColor:self.textColor])
        }

        var range = (mastr.string as NSString).range(of: subString)
        /// 做一个遍历，将所有的文字都配置高亮的颜色
        while range.location != NSNotFound {
            mastr.addAttribute(.foregroundColor, value: color, range: range)
            let nextRange = NSRange(location: range.location + range.length, length: mastr.length - (range.location + range.length))
            range = (mastr.string as NSString).range(of: subString, options: [], range: nextRange)
        }
        return mastr
    }
}
```