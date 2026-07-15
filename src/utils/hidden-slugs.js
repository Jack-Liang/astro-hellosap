import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

/**
 * 扫描文章 frontmatter，返回所有 hidden 文章的 slug。
 * 用于在 sitemap 和 robots.txt 中排除它们，避免被搜索引擎收录。
 * sitemap 与 robots.txt 共用此结果，保证两者一致。
 */
export async function getHiddenSlugs() {
  const dir = './src/data/blog-posts'
  const files = await readdir(dir).catch(() => [])
  const slugs = []
  for (const file of files) {
    if (!/\.(md|mdx)$/.test(file)) continue
    const content = await readFile(join(dir, file), 'utf8')
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---/)
    if (!fmMatch) continue
    const fm = fmMatch[1]
    const isHidden = /^\s*hidden:\s*true\s*$/m.test(fm)
    if (!isHidden) continue
    const slugMatch = fm.match(/^\s*slug:\s*(.+?)\s*$/m)
    if (slugMatch) {
      const slug = slugMatch[1].replace(/['"]/g, '')
      if (slug) slugs.push(slug)
    }
  }
  return slugs
}
