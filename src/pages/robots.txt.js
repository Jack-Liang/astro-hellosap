import { getHiddenSlugs } from '../utils/hidden-slugs.js'

export async function GET() {
  const hiddenSlugs = await getHiddenSlugs()
  const disallowRules = hiddenSlugs
    .map((slug) => `Disallow: /blog/${slug}/`)
    .join('\n')

  const body = `User-agent: *
Allow: /
${disallowRules}

Sitemap: https://kiksoft.net/sitemap-index.xml
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  })
}
