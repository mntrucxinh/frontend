import { api } from '@/lib/axios'

import type {
  AdminAnnouncementCreateRequest,
  AdminAnnouncementListParams,
  AdminAnnouncementListResponse,
  AdminAnnouncementPayload,
  AdminAnnouncementResponse,
  AdminAnnouncementDeleteRequest,
  AdminAnnouncementUpdateRequest,
} from '@/types/admin-announcement'

const buildAnnouncementFormData = (payload: AdminAnnouncementPayload, files?: File[] | FileList) => {
  const formData = new FormData()
  formData.append('title', payload.title)
  formData.append('excerpt', payload.excerpt ?? '')
  formData.append('content_html', payload.content_html)
  formData.append('status', payload.status)
  formData.append('publish_to_facebook', String(payload.publish_to_facebook ?? false))
  formData.append('meta_title', payload.meta_title ?? '')
  formData.append('meta_description', payload.meta_description ?? '')
  formData.append('block_code', payload.block_code)

  if (files) {
    Array.from(files).forEach((file) => {
      formData.append('files', file)
    })
  }

  return formData
}

const createAnnouncement = async ({
  payload,
  files,
}: AdminAnnouncementCreateRequest): Promise<AdminAnnouncementResponse> => {
  const formData = buildAnnouncementFormData(payload, files)
  const res = await api.post<AdminAnnouncementResponse>('/admin/announcements', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

const updateAnnouncement = async ({
  id,
  payload,
  files,
}: AdminAnnouncementUpdateRequest): Promise<AdminAnnouncementResponse> => {
  const formData = buildAnnouncementFormData(payload, files)
  const res = await api.put<AdminAnnouncementResponse>(`/admin/announcements/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

const getAnnouncementList = async ({
  page = 1,
  pageSize = 20,
  status,
  grade,
  q,
  sortBy,
  sortOrder,
}: AdminAnnouncementListParams = {}): Promise<AdminAnnouncementListResponse> => {
  const res = await api.get<AdminAnnouncementListResponse>('/admin/announcements', {
    params: {
      page,
      page_size: pageSize,
      status,
      grade,
      q,
      sort_by: sortBy,
      sort_order: sortOrder,
    },
  })
  return res.data
}

const getAnnouncementDetail = async (id: number | string): Promise<AdminAnnouncementResponse> => {
  const res = await api.get<AdminAnnouncementResponse>(`/admin/announcements/${id}`)
  return res.data
}

const deleteAnnouncement = async ({ id, delete_on_facebook }: AdminAnnouncementDeleteRequest): Promise<void> => {
  await api.delete(`/admin/announcements/${id}`, {
    params: {
      delete_on_facebook: delete_on_facebook ?? false,
    },
  })
}

export default {
  createAnnouncement,
  updateAnnouncement,
  getAnnouncementList,
  getAnnouncementDetail,
  deleteAnnouncement,
}

