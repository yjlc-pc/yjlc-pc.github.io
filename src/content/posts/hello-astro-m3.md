---
title: 第一篇：这个博客是怎么搭起来的
description: 记录这个站点的技术选型、M3 主题的实现方式，以及写作流程。以后写新文章时可以把它当模板。
date: 2026-10-23
tags: ["Astro", "Material Design 3", "博客"]
draft: false
---

这是一篇模板文章，用来验证排版、代码高亮、目录和评论是否正常。你可以直接复制它，改成自己的内容。

## 技术选型

站点用 [Astro](https://astro.build/) 生成静态页面，托管在 GitHub Pages。没有数据库，也没有常驻服务器：

- 文章是仓库里的 Markdown 文件；
- 每次 push 触发 GitHub Actions，构建后发布到 Pages；
- 搜索用 Pagefind，构建时生成索引；
- 评论用 giscus，数据存在 GitHub Discussions。

## 视觉与排版

界面遵循 Material Design 3：颜色由种子色生成完整的 light/dark 色板，层级靠色调分层而不是阴影。正文使用霞鹜文楷 GB Screen，代码使用 JetBrains Mono。

> 设计 token 集中写在一个地方，换主题时只改种子色，不用逐页调样式。

### 一段代码

```ts
import { getCollection } from 'astro:content'

const posts = await getCollection('posts', ({ data }) => !data.draft)
const sorted = posts.sort(
  (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
)
```

### 一张表格

| 部分 | 方案 | 备注 |
| --- | --- | --- |
| 构建 | Astro 静态输出 | 页面默认不带 JS |
| 搜索 | Pagefind | 构建时索引 |
| 评论 | giscus | 基于 Discussions |
| 部署 | GitHub Actions | push 即发布 |

## 写作流程

本地写 Markdown，或者打开 Pages CMS 用表单编辑；两条路改的是同一批文件。

1. 新建 `src/content/posts/xxx.md`；
2. 填好 `title`、`date`、`tags`、`description`；
3. 提交并推送，等 Actions 跑完。

![占位图：构建流程](/media/placeholder.svg)

图片放在 `public/media/`，在 Markdown 里用 `/media/文件名` 引用。

## 接下来

先写几篇真正想写的文章，再根据阅读体验调整字号和配色。占位内容随时可以删掉。
