import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import adminAlbumService from '@/service/admin-album-service'
import type {
  AdminAlbumListParams,
  AdminAlbumListResponse,
  AdminAlbumResponse,
} from '@/types/admin-album'

export const useAdminAlbumList = (
  params: AdminAlbumListParams,
  options?: UseQueryOptions<AdminAlbumListResponse>
) => {
  return useQuery<AdminAlbumListResponse>({
    queryKey: ['admin-album', 'list', params],
    queryFn: () => adminAlbumService.getAlbumList(params),
    ...options,
  })
}

export const useAdminAlbumDetail = (
  id?: string | number,
  options?: UseQueryOptions<AdminAlbumResponse>
) => {
  return useQuery<AdminAlbumResponse>({
    queryKey: ['admin-album', 'detail', id],
    queryFn: () => adminAlbumService.getAlbumDetail(id as string | number),
    enabled: Boolean(id),
    ...options,
  })
}

