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
  integrations: [
    mdx(),
    svelte(),
    sitemap({
      filter: (page) => {
        return !hiddenSlugs.some((slug) => page.includes(`/blog/${slug}/`))
      }
    })
  ],
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
