export const siteConfig = {
  title: 'yjlc 的博客',
  description: '把折腾过程写下来：代码、工具、阅读和日常。',
  author: 'yjlc',
  url: 'https://yjlc-pc.github.io',
  locale: 'zh-CN',
  // mixed：正文霞鹜文楷 + UI 无衬线；wenkai：全站文楷
  fontMode: 'mixed' as 'mixed' | 'wenkai',
  avatar: '/media/avatar.svg',
  // 建好仓库、开启 Discussions 并安装 giscus App 后填入
  giscus: {
    // 恢复 GitHub 账号并安装 giscus App 后改成 true
    enabled: false,
    repo: 'yjlc-pc/yjlc-pc.github.io',
    repoId: 'R_kgDOVUpWWw',
    category: 'Announcements',
    categoryId: 'DIC_kwDOVUpWW84DJaXz',
    mapping: 'pathname',
    strict: '0',
    reactionsEnabled: '1',
    inputPosition: 'top',
    lang: 'zh-CN',
  },
} as const

export type SiteConfig = typeof siteConfig
