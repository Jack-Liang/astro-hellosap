import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function GET(context) {
  let posts = await getCollection('posts')
  posts = posts
    .filter((post) => !post.data.hidden)
    .sort(
      (a, b) =>
        new Date(b.data.publishDate).valueOf() -
        new Date(a.data.publishDate).valueOf()
    )

  return rss({
    title: 'SAP学习中心',
    description:
      'SAP学习中心提供免费的SAP教程、学习资源和实战经验分享。涵盖SAP GUI安装配置、ABAP开发、HANA数据库等技术内容。',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.publishDate),
      link: `/blog/${post.data.slug}/`,
      categories: post.data.tags || [],
    })),
    customData: `<language>zh-CN</language>`,
  })
}
