import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { NewsListResponse } from "@/types/news"
import newsService from "@/service/news-service"

interface UseNewsListParams {
  page?: number
  pageSize?: number
  options?: UseQueryOptions<NewsListResponse>
}

export function useNewsList({
  page = 1,
  pageSize = 20,
  options,
}: UseNewsListParams = {}) {
  return useQuery<NewsListResponse>({
    queryKey: ["news", "list", page, pageSize],
    queryFn: () => newsService.getNewsList(page, pageSize),
    ...options,
  })
}

