import rss from '@astrojs/rss';
import { getPosts, getEssays, getEssayDisplayTitle, getPostDescription } from '~/utils';
import { THEME_CONFIG } from "~/theme.config";
import type { APIContext } from 'astro';
import type { Essay } from '~/types/index';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

const { title, desc, website, author } = THEME_CONFIG


export async function GET(_context: APIContext) {
  try {
    const posts = await getPosts()
    const essays = await getEssays()
    const allowedTags = sanitizeHtml.defaults.allowedTags.concat(['img'])

    // 合并文章和随笔，按发布日期排序
    const allContent = [
      ...posts.map((post) => ({
        type: 'post',
        content: post,
        link: `/posts/${post.slug}/`,
      })),
      ...essays.map((essay) => ({
        type: 'essay',
        content: essay,
        link: `/essays/${essay.slug}/`,
      }))
    ].sort((a, b) => {
      const aDate = a.content.data.pubDate || new Date()
      const bDate = b.content.data.pubDate || new Date()
      return bDate.getTime() - aDate.getTime()
    })

    return rss({
      title: title,
      description: desc,
      site: website,
      items: allContent.map((item) => {
        const content = item.content
        // 确保标题存在，对于随笔使用生成的标题
        const itemTitle = item.type === 'essay'
          ? (content.data.title || getEssayDisplayTitle(content as Essay))
          : content.data.title

        return {
          link: item.link,
          author: author,
          content: sanitizeHtml(parser.render(content.body), { allowedTags, }),
          title: itemTitle,
          pubDate: content.data.pubDate,
          description: item.type === 'post' ? getPostDescription(content as any) : '',
          customData: content.data.customData,
          categories: 'categories' in content.data ? (content.data.categories as string[]) : [],
          commentsUrl: content.data.commentsUrl,
          source: content.data.source,
          enclosure: content.data.enclosure,
        }
      }),
      stylesheet: '/pretty-feed-v3.xsl',
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new Response('Error generating RSS feed', { status: 500 });
  }
}
