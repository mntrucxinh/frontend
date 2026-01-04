import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { NewsDetailResponse } from "@/types/news"
import newsService from "@/service/news-service"

interface UseNewsDetailParams {
  slug: string
  options?: UseQueryOptions<NewsDetailResponse>
}

export function useNewsDetail({ slug, options }: UseNewsDetailParams) {
  return useQuery<NewsDetailResponse>({
    queryKey: ["news", "detail", slug],
    queryFn: () => newsService.getNewsDetail(slug),
    enabled: !!slug,
    ...options,
  })
}

