import { api } from '@/lib/axios'

import type {
  AdminAlbumCreateRequest,
  AdminAlbumListParams,
  AdminAlbumListResponse,
  AdminAlbumResponse,
  AdminAlbumDeleteRequest,
  AdminAlbumUpdateRequest,
  SlugCheckResponse,
} from '@/types/admin-album'

// Upload asset và lấy public_id
const uploadAsset = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('file', file)
  const res = await api.post<{ id: number; public_id: string; url: string; mime_type: string }>(
    '/admin/assets',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  )
  return res.data.public_id
}

const buildAlbumFormData = ({
  payload,
  coverFile,
  newFiles,
  newCaptions,
  existingAssetPublicIds,
  existingCaptions,
  videoPublicIds,
}: AdminAlbumCreateRequest): FormData => {
  const formData = new FormData()
  
  // Text fields
  formData.append('title', payload.title)
  if (payload.description) {
    formData.append('description', payload.description)
  }
  formData.append('status', payload.status)
  if (payload.slug) {
    formData.append('slug', payload.slug)
  }

  // Cover - nếu có coverFile thì upload trước để lấy public_id
  // Note: Với create, cover sẽ được xử lý sau khi upload coverFile
  // Với update, cover_asset_public_id sẽ được set trong payload

  // New files
  if (newFiles && newFiles.length > 0) {
    newFiles.forEach((file) => {
      formData.append('new_files', file)
    })
  }

  // New captions
  if (newCaptions && newCaptions.length > 0) {
    newCaptions.forEach((caption) => {
      formData.append('new_captions', caption || '')
    })
  }

  // Existing asset public IDs
  if (existingAssetPublicIds && existingAssetPublicIds.length > 0) {
    existingAssetPublicIds.forEach((publicId) => {
      formData.append('existing_asset_public_ids', publicId)
    })
  }

  // Existing captions
  if (existingCaptions && existingCaptions.length > 0) {
    existingCaptions.forEach((caption) => {
      formData.append('existing_captions', caption || '')
    })
  }

  // Video public IDs
  if (videoPublicIds && videoPublicIds.length > 0) {
    videoPublicIds.forEach((publicId) => {
      formData.append('video_public_ids', publicId)
    })
  }

  return formData
}

const createAlbum = async (request: AdminAlbumCreateRequest): Promise<AdminAlbumResponse> => {
  // Nếu có coverFile, upload trước để lấy public_id
  let coverAssetPublicId: string | null = null
  if (request.coverFile) {
    coverAssetPublicId = await uploadAsset(request.coverFile)
  } else if (request.payload.cover_asset_public_id) {
    coverAssetPublicId = request.payload.cover_asset_public_id
  }

  // Build form data với cover_asset_public_id
  const formData = buildAlbumFormData({
    ...request,
    payload: {
      ...request.payload,
      cover_asset_public_id: coverAssetPublicId,
    },
  })

  // Thêm cover_asset_public_id vào formData nếu có
  if (coverAssetPublicId) {
    formData.append('cover_asset_public_id', coverAssetPublicId)
  }

  const res = await api.post<AdminAlbumResponse>('/admin/albums', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

const updateAlbum = async ({
  id,
  payload,
  coverFile,
  newFiles,
  newCaptions,
  existingAssetPublicIds,
  existingCaptions,
  videoPublicIds,
}: AdminAlbumUpdateRequest & {
  coverFile?: File | null
  newFiles?: File[]
  newCaptions?: string[]
  existingAssetPublicIds?: string[]
  existingCaptions?: string[]
  videoPublicIds?: string[]
}): Promise<AdminAlbumResponse> => {
  // Nếu có coverFile mới, upload trước để lấy public_id
  let coverAssetPublicId: string | null | undefined = payload.cover_asset_public_id
  if (coverFile) {
    coverAssetPublicId = await uploadAsset(coverFile)
  }

  // Build FormData tương tự create
  const formData = new FormData()

  // Text fields
  if (payload.title !== undefined) {
    formData.append('title', payload.title)
  }
  if (payload.description !== undefined) {
    formData.append('description', payload.description || '')
  }
  if (payload.status !== undefined) {
    formData.append('status', payload.status)
  }
  if (payload.slug !== undefined) {
    formData.append('slug', payload.slug || '')
  }

  // Cover
  if (coverAssetPublicId !== undefined) {
    if (coverAssetPublicId) {
      formData.append('cover_asset_public_id', coverAssetPublicId)
    }
  }

  // New files
  if (newFiles && newFiles.length > 0) {
    newFiles.forEach((file) => {
      formData.append('new_files', file)
    })
  }

  // New captions
  if (newCaptions && newCaptions.length > 0) {
    newCaptions.forEach((caption) => {
      formData.append('new_captions', caption || '')
    })
  }

  // Existing asset public IDs
  if (existingAssetPublicIds !== undefined) {
    if (existingAssetPublicIds && existingAssetPublicIds.length > 0) {
      existingAssetPublicIds.forEach((publicId) => {
        formData.append('existing_asset_public_ids', publicId)
      })
    }
    // Nếu là empty array, gửi một field rỗng để backend biết xóa hết
    if (existingAssetPublicIds.length === 0 && (newFiles?.length === 0 || !newFiles)) {
      formData.append('existing_asset_public_ids', '')
    }
  }

  // Existing captions
  if (existingCaptions && existingCaptions.length > 0) {
    existingCaptions.forEach((caption) => {
      formData.append('existing_captions', caption || '')
    })
  }

  // Video public IDs
  if (videoPublicIds !== undefined) {
    if (videoPublicIds && videoPublicIds.length > 0) {
      videoPublicIds.forEach((publicId) => {
        formData.append('video_public_ids', publicId)
      })
    }
    // Nếu là empty array, gửi một field rỗng để backend biết xóa hết
    if (videoPublicIds.length === 0) {
      formData.append('video_public_ids', '')
    }
  }

  const res = await api.put<AdminAlbumResponse>(`/admin/albums/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

const getAlbumList = async ({
  page = 1,
  pageSize = 20,
  status,
  q,
}: AdminAlbumListParams = {}): Promise<AdminAlbumListResponse> => {
  const res = await api.get<AdminAlbumListResponse>('/admin/albums', {
    params: {
      page,
      page_size: pageSize,
      status,
      q,
    },
  })
  return res.data
}

const getAlbumDetail = async (id: number | string): Promise<AdminAlbumResponse> => {
  const res = await api.get<AdminAlbumResponse>(`/admin/albums/${id}`)
  return res.data
}

const deleteAlbum = async ({ id }: AdminAlbumDeleteRequest): Promise<void> => {
  await api.delete(`/admin/albums/${id}`)
}

const checkSlug = async (slug: string): Promise<SlugCheckResponse> => {
  const res = await api.get<SlugCheckResponse>('/admin/albums/slug/check', {
    params: { slug },
  })
  return res.data
}

export default {
  createAlbum,
  updateAlbum,
  getAlbumList,
  getAlbumDetail,
  deleteAlbum,
  checkSlug,
  uploadAsset,
}

