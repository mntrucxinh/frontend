import React from 'react'

import { MOCK_NEWS_DETAIL } from '../mock-data'
import NewsDetailBreadCrumbs from './NewsDetailBreadCrumbs'
import NewsDetailContent from './NewsDetailContent'

export default function NewsDetailInformation() {
  const news = MOCK_NEWS_DETAIL
  return (
    <div>
      <NewsDetailBreadCrumbs id={news.id} metaTitle={news.meta_title} />
      <NewsDetailContent
        news={{
          title: news.title,
          slug: news.slug,
          excerpt: news.excerpt,
          content_html: news.content_html,
          status: news.status,
          meta_title: news.meta_title,
          meta_description: news.meta_description,
          content_assets: [...news.content_assets],
          published_at: news.published_at,
          created_at: news.created_at,
          updated_at: news.updated_at,
        }}
      />
    </div>
  )
}
