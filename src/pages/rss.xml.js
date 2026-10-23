import rss from '@astrojs/rss'
import { getPosts, postUrl } from '../lib/posts'
import { siteConfig } from '../site.config'

export async function GET(context) {
  const posts = await getPosts()
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site ?? siteConfig.url,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: postUrl(post),
    })),
    customData: '<language>zh-CN</language>',
  })
}
