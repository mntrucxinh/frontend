import { api } from '@/lib/axios'
import { AnnouncementListResponse, PushAnnouncementResponse } from '@/types/announcement'
import { AxiosError } from 'axios'

export class AnnouncementServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message)
    this.name = 'AnnouncementServiceError'
  }
}

const normalizeError = (error: unknown): AnnouncementServiceError => {
  if (error instanceof AnnouncementServiceError) return error

  if (error instanceof AxiosError) {
    const status = error.response?.status
    const data: any = error.response?.data
    const detail = data?.detail
    const message =
      (typeof detail === 'string' ? detail : detail?.message) ||
      data?.message ||
      data?.error ||
      error.message ||
      'Failed to fetch data'
    return new AnnouncementServiceError(message, status, error)
  }

  return new AnnouncementServiceError('Network error occurred', 0, error)
}

const getAnnouncementsList = async (
  page: number = 1,
  pageSize: number = 20,
  grade?: string
): Promise<AnnouncementListResponse> => {
  try {
    const res = await api.get<AnnouncementListResponse>('/public/announcements', {
      params: {
        page,
        page_size: pageSize,
        grade,
      },
    })
    return res.data
  } catch (error) {
    throw normalizeError(error)
  }
}

const pushAnnouncement = async (slug: string): Promise<PushAnnouncementResponse> => {
  if (!slug || typeof slug !== 'string' || slug.trim().length === 0) {
    throw new AnnouncementServiceError('Invalid slug parameter', 400)
  }

  try {
    const res = await api.post<PushAnnouncementResponse>(
      `/admin/push/announcement/${encodeURIComponent(slug)}`
    )
    return res.data
  } catch (error) {
    throw normalizeError(error)
  }
}

export default {
  getAnnouncementsList,
  pushAnnouncement,
}
