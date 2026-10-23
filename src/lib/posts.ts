import { getCollection, type CollectionEntry } from 'astro:content'

export type Post = CollectionEntry<'posts'>

/** 按日期倒序返回已发布文章。 */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft)
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}

export function postUrl(post: Post): string {
  return `/posts/${post.id}/`
}

export function tagSlug(tag: string): string {
  return tag.trim().toLowerCase().replace(/\s+/g, '-')
}

export function tagUrl(tag: string): string {
  return `/tags/${encodeURIComponent(tagSlug(tag))}/`
}

export interface TagSummary {
  name: string
  count: number
}

export function collectTags(posts: Post[]): TagSummary[] {
  const counts = new Map<string, number>()
  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh-CN'))
}

const longDate = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

export function formatDate(date: Date): string {
  return longDate.format(date)
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

/** 中文按 400 字/分钟估算，返回至少 1 分钟。 */
export function readingMinutes(body: string | undefined): number {
  if (!body) return 1
  const chars = body.replace(/\s+/g, '').length
  return Math.max(1, Math.round(chars / 400))
}
