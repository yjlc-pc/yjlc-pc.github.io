# yjlc 的博客

一个用 Astro 生成、托管在 GitHub Pages 的静态博客，视觉遵循 Material Design 3。

- 线上地址：<https://yjlc-pc.github.io/>
- 技术栈：Astro 7 + Beer CSS 5 + Pagefind + giscus
- 字体：正文霞鹜文楷 GB Screen（jsDelivr CDN），代码 JetBrains Mono
- 在线写作：Pages CMS（仓库根目录的 `.pages.yml`）

## 本地开发

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # 生成 dist/，并建立 Pagefind 搜索索引
pnpm preview  # 预览构建产物
```

## 写一篇文章

在 `src/content/posts/` 新建 `.md` 文件：

```md
---
title: 标题
description: 一句话摘要
date: 2026-10-23
tags: ["Astro", "随笔"]
draft: false
---

正文从这里开始。
```

- `draft: true` 的文章不会出现在站点、RSS 和搜索里。
- 图片放在 `public/media/`，正文用 `/media/文件名` 引用。
- 提交并 push 到 `main`，GitHub Actions 会自动构建并发布。

也可以打开 <https://app.pagescms.org>，用 GitHub 登录后选择本仓库，用表单写文章、传图片。

## 主题与排版

- 颜色：`scripts/gen-theme.mjs` 从种子色 `#3B5BA5` 生成完整的 light/dark 色板（含 Beer CSS 变量）。
  修改种子色后运行 `pnpm theme`。
- 排版：`src/styles/tokens.css` 里的 15 级 type scale；正文默认「文楷 + UI 无衬线」。
  想全站使用文楷，把 `src/site.config.ts` 的 `fontMode` 改成 `'wenkai'`。
- 字体对比页：`/font-preview/`（不进入导航，也不会被 sitemap 收录）。

## 评论

评论使用 giscus，数据存在仓库的 GitHub Discussions 里。

首次启用步骤：

1. 仓库 Settings → General → Features，勾选 **Discussions**。
2. 安装 [giscus App](https://github.com/apps/giscus)，授权这个仓库。
3. 打开 <https://giscus.app/zh-CN>，填入仓库名，选择 `Announcements` 分类，复制生成的 `data-repo-id` 和 `data-category-id`。
4. 填进 `src/site.config.ts` 的 `giscus.repoId` / `giscus.categoryId`，提交后自动生效。

没有配置之前，文章页会显示一行说明，不会报错。

## 部署

`.github/workflows/deploy.yml` 负责构建和发布：

- push 到 `main` 触发；
- 需要仓库 Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**；
- 站点 URL 由仓库名决定：仓库叫 `yjlc-pc.github.io` 时是根域名，不需要配置 base 路径。

## 目录

```text
src/
  components/     导航、卡片、目录、评论等
  content/posts/  文章
  content/pages/  单页（关于）
  layouts/        页面骨架
  lib/            文章排序、标签、日期
  pages/          路由
  styles/         theme.css（生成）、tokens.css、base.css、prose.css
public/           静态文件（favicon、图片、robots.txt）
scripts/          主题生成脚本
```
