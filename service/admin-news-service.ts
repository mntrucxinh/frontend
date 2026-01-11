import { api } from '@/lib/axios'

import type {
  AdminNewsCreateRequest,
  AdminNewsListParams,
  AdminNewsListResponse,
  AdminNewsPayload,
  AdminNewsResponse,
  AdminNewsDeleteRequest,
  AdminNewsUpdateRequest,
} from '@/types/admin-news'

const buildNewsFormData = (payload: AdminNewsPayload, files?: File[] | FileList) => {
  const formData = new FormData()
  formData.append('title', payload.title)
  formData.append('excerpt', payload.excerpt ?? '')
  formData.append('content_html', payload.content_html)
  formData.append('status', payload.status)
  formData.append('publish_to_facebook', String(payload.publish_to_facebook ?? false))
  formData.append('meta_title', payload.meta_title ?? '')
  formData.append('meta_description', payload.meta_description ?? '')

  if (files) {
    Array.from(files).forEach((file) => {
      formData.append('files', file)
    })
  }

  return formData
}

const createNews = async ({
  payload,
  files,
}: AdminNewsCreateRequest): Promise<AdminNewsResponse> => {
  const formData = buildNewsFormData(payload, files)
  const res = await api.post<AdminNewsResponse>('/admin/news', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

const updateNews = async ({
  id,
  payload,
  files,
}: AdminNewsUpdateRequest): Promise<AdminNewsResponse> => {
  const formData = buildNewsFormData(payload, files)
  const res = await api.put<AdminNewsResponse>(`/admin/news/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

const getNewsList = async ({
  page = 1,
  pageSize = 20,
  status,
  q,
  sortBy,
  sortOrder,
}: AdminNewsListParams = {}): Promise<AdminNewsListResponse> => {
  const res = await api.get<AdminNewsListResponse>('/admin/news', {
    params: {
      page,
      page_size: pageSize,
      status,
      q,
      sort_by: sortBy,
      sort_order: sortOrder,
    },
  })
  return res.data
}

const getNewsDetail = async (id: number | string): Promise<AdminNewsResponse> => {
  const res = await api.get<AdminNewsResponse>(`/admin/news/${id}`)
  return res.data
}

const deleteNews = async ({ id, delete_on_facebook }: AdminNewsDeleteRequest): Promise<void> => {
  await api.delete(`/admin/news/${id}`, {
    params: {
      delete_on_facebook: delete_on_facebook ?? false,
    },
  })
}

export default {
  createNews,
  updateNews,
  getNewsList,
  getNewsDetail,
  deleteNews,
}
