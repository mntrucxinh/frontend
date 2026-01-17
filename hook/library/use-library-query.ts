import { useQuery } from '@tanstack/react-query'
import { libraryService, type AssetListParams, type AlbumListParams } from '@/service/library-service'

// Query keys
export const libraryKeys = {
  all: ['library'] as const,
  assets: (params?: AssetListParams) => [...libraryKeys.all, 'assets', params] as const,
  albums: (params?: AlbumListParams) => [...libraryKeys.all, 'albums', params] as const,
  album: (slug: string) => [...libraryKeys.all, 'album', slug] as const,
}

// Hooks
export const useLibraryAssets = (params: AssetListParams = {}) => {
  return useQuery({
    queryKey: libraryKeys.assets(params),
    queryFn: () => libraryService.getAssets(params),
  })
}

export const useLibraryAlbums = (params: AlbumListParams = {}) => {
  return useQuery({
    queryKey: libraryKeys.albums(params),
    queryFn: () => libraryService.getAlbums(params),
  })
}

export const useLibraryAlbum = (slug: string) => {
  return useQuery({
    queryKey: libraryKeys.album(slug),
    queryFn: () => libraryService.getAlbumBySlug(slug),
    enabled: !!slug,
  })
}

