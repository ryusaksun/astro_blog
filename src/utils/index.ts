import { getCollection } from 'astro:content'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'
import type { Post, Essay } from '../types/index'

// 缓存数据（仅在 build 时生效，dev 模式下跳过以支持 HMR）
const isDev = import.meta.env.DEV
let postsCache: Post[] | null = null
let essaysCache: Essay[] | null = null

export async function getPosts() {
  if (!isDev && postsCache) return postsCache

  try {
    const posts = await getCollection('posts')
    posts.sort((a, b) => {
      const aDate = a.data.pubDate || new Date()
      const bDate = b.data.pubDate || new Date()
      return bDate.getTime() - aDate.getTime()
    })
    if (!isDev) postsCache = posts
    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export async function getEssays() {
  if (!isDev && essaysCache) return essaysCache

  try {
    const essays = await getCollection('essays')
    essays.sort((a, b) => {
      const aDate = a.data.pubDate || new Date()
      const bDate = b.data.pubDate || new Date()
      return bDate.getTime() - aDate.getTime()
    })
    if (!isDev) essaysCache = essays
    return essays
  } catch (error) {
    console.error('Error fetching essays:', error)
    return []
  }
}

const parser = new MarkdownIt()

export function getPostDescription(post: Post) {
  // Posts no longer have description, generate from content
  const html = parser.render(post.body)
  const sanitized = sanitizeHtml(html, { allowedTags: [] })
  return sanitized.slice(0, 400)
}



export function getEssayDisplayTitle(essay: Essay) {
  // 如果有标题就使用标题
  if (essay.data.title) {
    return essay.data.title
  }

  // 否则使用内容的前50个字符作为标题
  const html = parser.render(essay.body)
  const sanitized = sanitizeHtml(html, { allowedTags: [] })
  const preview = sanitized.slice(0, 50).trim()
  return preview + (sanitized.length > 50 ? '...' : '')
}

export function formatDate(date?: Date) {
  if (!date) return '--'
  try {
    const year = date.getFullYear().toString().padStart(4, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  } catch (error) {
    console.error('Error formatting date:', error)
    return '--'
  }
}

// 格式化时间为简洁格式，包含具体时间（用于随笔）
export function formatEssayDate(date?: Date) {
  if (!date) return '--'
  try {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}/${month}/${day} ${hours}:${minutes}`
  } catch (error) {
    console.error('Error formatting essay date:', error)
    return '--'
  }
}

// 清理缓存函数（用于开发环境）
export function clearCache() {
  postsCache = null
  essaysCache = null
}