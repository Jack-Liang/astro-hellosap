import { defineConfig } from 'astro/config'
import svelte from '@astrojs/svelte'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import rehypeExternalLinks from 'rehype-external-links'
import { getHiddenSlugs } from './src/utils/hidden-slugs.js'

// 在配置阶段读取，避免每个 page 请求都扫描文件系统
const hiddenSlugs = await getHiddenSlugs()

// https://astro.build/config
export default defineConfig({
  site: 'https://kiksoft.net',
  // 视口内链接预获取，配合 View Transitions 实现近乎瞬时的页面切换
  prefetch: true,
  // 小样式表内联到 HTML，减少 CSS 请求数（auto: 按体积自动决定）
  build: {
    inlineStylesheets: 'auto',
  },
  integrations: [
    mdx(),
    svelte(),
    sitemap({
      filter: (page) => {
        return !hiddenSlugs.some((slug) => page.includes(`/blog/${slug}/`))
      }
    })
  ],
  // 编辑文章 frontmatter 时提供集合字段的智能提示（IDE 补全）
  experimental: {
    contentIntellisense: true,
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'nord',
        dark: 'github-dark',
      },
    },
    remarkPlugins: [remarkGfm, remarkSmartypants],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
        },
      ],
    ],
  },
})
