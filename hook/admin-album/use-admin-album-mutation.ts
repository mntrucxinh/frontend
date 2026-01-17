import { useMutation } from '@tanstack/react-query'

import adminAlbumService from '@/service/admin-album-service'
import type {
  AdminAlbumCreateRequest,
  AdminAlbumDeleteRequest,
  AdminAlbumResponse,
  AdminAlbumUpdateRequest,
} from '@/types/admin-album'
import type { AxiosErrorResponse } from '@/types/errors'

export const useCreateAdminAlbum = () => {
  return useMutation<AdminAlbumResponse, AxiosErrorResponse, AdminAlbumCreateRequest>({
    mutationFn: adminAlbumService.createAlbum,
  })
}

export const useUpdateAdminAlbum = () => {
  return useMutation<
    AdminAlbumResponse,
    AxiosErrorResponse,
    AdminAlbumUpdateRequest & {
      coverFile?: File | null
      newFiles?: File[]
      newCaptions?: string[]
      existingAssetPublicIds?: string[]
      existingCaptions?: string[]
      videoPublicIds?: string[]
    }
  >({
    mutationFn: ({
      id,
      payload,
      coverFile,
      newFiles,
      newCaptions,
      existingAssetPublicIds,
      existingCaptions,
      videoPublicIds,
    }) =>
      adminAlbumService.updateAlbum({
        id,
        payload,
        coverFile,
        newFiles,
        newCaptions,
        existingAssetPublicIds,
        existingCaptions,
        videoPublicIds,
      }),
  })
}

export const useDeleteAdminAlbum = () => {
  return useMutation<void, AxiosErrorResponse, AdminAlbumDeleteRequest>({
    mutationFn: adminAlbumService.deleteAlbum,
  })
}

