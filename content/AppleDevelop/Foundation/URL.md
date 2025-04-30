---
# 文章的标题
title: "URL"
# 文章的时间
date: 2025-04-30T11:44:53+08:00
# 文章是否为草稿状态 草稿状态不会发布到文章列表
draft: false
# 文章描述 在文章列表页展示的内容
description: "标识资源位置的值，例如远程服务器上的项目或本地文件的路径。"
# 文章的过期时间  过期后不会发布到文章列表
#expiryDate:  //.ExpiryDate
# 文章的发布时间  未到达发布时间不会发布到文章列表
#publishDate: //.PublishDate
# 上次修改的日期
#lastmod: // .Lastmod
# 作者
author: "OverLookArt"
---

## 修改 URL 的参数

对 URL 进行扩展 

``` swift
extension URL {
    func modifyURLParameters(newParameters: [String: String]) -> URL? {
        guard var urlComponents = URLComponents(string: self.absoluteString) else { return nil }
        // 检查是否包含 `/#/`，需要特殊处理 fragment 部分
        if let fragment = urlComponents.fragment {
            // 分离 `/#/` 的路径和查询部分
            var fragmentComponents = fragment.components(separatedBy: "?")
            let path = fragmentComponents[0]

            // 获取查询参数部分，或初始化为空
            var queryItems: [URLQueryItem] = []
            if fragmentComponents.count > 1, let query = fragmentComponents[1].removingPercentEncoding {
                queryItems = URLComponents(string: "http://dummy?\(query)")?.queryItems ?? []
            }
            // 遍历需要修改的参数
            for (key, newValue) in newParameters {
                // 查找是否已有该参数
                if let index = queryItems.firstIndex(where: { $0.name == key }) {
                    // 修改已有参数的值
                    queryItems[index].value = newValue
                } else {
                    // 如果没有，则追加新参数
                    queryItems.append(URLQueryItem(name: key, value: newValue))
                }
            }
            // 重新组装 fragment
            let newQuery = queryItems.map { "\($0.name)=\($0.value ?? "")" }.joined(separator: "&")
            fragmentComponents = [path]
            if !newQuery.isEmpty {
                fragmentComponents.append(newQuery)
            }
            urlComponents.fragment = fragmentComponents.joined(separator: "?")
        } else {
            // 普通 URL，不包含 `/#/`，直接修改查询参数
            var queryItems = urlComponents.queryItems ?? []
            for (key, newValue) in newParameters {
                // 查找是否已有该参数
                if let index = queryItems.firstIndex(where: { $0.name == key }) {
                    // 修改已有参数的值
                    queryItems[index].value = newValue
                } else {
                    // 如果没有，则追加新参数
                    queryItems.append(URLQueryItem(name: key, value: newValue))
                }
            }
            urlComponents.queryItems = queryItems
        }        
        return urlComponents.url
    }
}

```