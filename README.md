# Hello SAP

一个基于 [Astro](https://astro.build) 的中文技术博客，分享 SAP 学习资源、ABAP 开发、HANA、SAP GUI 安装配置等实战经验。

线上地址：<https://kiksoft.net>

## ✨ 功能特性

- ✅ Astro 5 + 内容集合（Content Collections）
- ✅ Markdown / MDX 写作，支持 GFM、SmartyPants
- ✅ 明暗双主题，跟随系统并记忆偏好
- ✅ 博客标签筛选与标签栏折叠
- ✅ 文章阅读时长估算
- ✅ 手绘风格注释（[rough-notation](https://github.com/rough-stuff/rough-notation)，MDX 组件）
- ✅ 代码块语法高亮，随主题切换（Shiki 双主题）
- ✅ RSS 订阅源（`/rss.xml`）
- ✅ 自动生成 `sitemap.xml` 与 `robots.txt`，并排除隐藏文章
- ✅ 自定义 404 页面
- ✅ 部署于 Cloudflare Workers（静态资源走 KV，图片走 R2）

## 🚀 项目结构

```
/
├── public/                 # 静态资源（原样输出）
│   ├── assets/             # 图片、字体、Logo
│   └── favicon.ico
├── src/
│   ├── components/         # 组件（Header / Nav / Footer / Notation 等）
│   ├── data/
│   │   └── blog-posts/     # Markdown / MDX 文章
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro     # 首页
│   │   ├── about.astro     # 关于
│   │   ├── 404.astro       # 404 页面
│   │   ├── rss.xml.js      # RSS 订阅源
│   │   ├── robots.txt.js   # 动态生成的 robots.txt
│   │   └── blog/
│   │       ├── index.astro # 文章列表
│   │       └── [slug].astro# 文章详情
│   ├── scripts/
│   │   └── tags-toggle.js  # 标签折叠逻辑（列表页与详情页共用）
│   ├── styles/             # 全局样式与字体
│   ├── utils/
│   │   └── hidden-slugs.js # 提取隐藏文章（sitemap / robots 共用）
│   └── content.config.js   # 内容集合 schema
├── astro.config.mjs
├── worker.js               # Cloudflare Workers 入口
├── wrangler.jsonc          # Cloudflare 部署配置
└── package.json
```

## 📝 写作

文章放在 `src/data/blog-posts/`，新建 `.md` 或 `.mdx` 文件，frontmatter 字段：

```yaml
---
title: 文章标题
slug: url-slug
publishDate: 2026-01-15
description: 文章摘要，会显示在列表页与 SEO 描述中
hidden: false              # 可选，true 则不在列表/RSS/sitemap 出现
tags: ['SAP GUI', '配置']  # 可选
---
```

MDX 文章可使用 `<Notation>` 组件添加手绘风格注释：

```mdx
<Notation type="highlight" color="yellow">重点内容</Notation>
<Notation type="circle" color="#548e9b">圈起来的内容</Notation>
```

`type` 支持：`underline` / `circle` / `highlight` / `box` / `strike-through` / `crossed-off` / `bracket`。

## 🧞 常用命令

| 命令              | 作用                                  |
| :---------------- | :------------------------------------ |
| `pnpm install`    | 安装依赖                              |
| `pnpm run dev`    | 启动本地开发服务器（默认 `localhost:4321`） |
| `pnpm run build`  | 构建生产站点到 `./dist/`              |
| `pnpm run preview`| 本地预览构建产物                      |
| `pnpm run deploy` | 通过 Wrangler 部署到 Cloudflare       |

> 项目使用 pnpm（见 `.npmrc` 与 `pnpm-lock.yaml`）。

## ☁️ 部署

部署到 Cloudflare Workers：

1. 构建产物：`pnpm run build`
2. 部署：`pnpm run deploy`（底层为 `wrangler deploy`）

配置见 `wrangler.jsonc`：静态资源目录为 `./dist`，图片资源走 R2 桶 `hellosap`（绑定名 `IMAGE_BUCKET`）。`worker.js` 处理静态资产分发，并在找不到资源时回退到 `404.html`。

## 🔧 配置说明

- **站点地址**：`astro.config.mjs` 的 `site` 字段，决定 RSS / sitemap / canonical / Open Graph 等所有绝对地址。
- **隐藏文章**：在文章 frontmatter 设 `hidden: true`，重新构建后 RSS、sitemap、robots.txt、文章列表会自动同步排除（统一由 `src/utils/hidden-slugs.js` 提供）。
- **主题色**：`src/styles/global.css` 顶部的 CSS 变量（`--primary-color`、`--tag-bg` 等），明暗两套。

---

基于 [Astro Blog Template](https://github.com/Charca/astro-blog-template) 改造。技术问题欢迎交流：jack@kiksoft.net
