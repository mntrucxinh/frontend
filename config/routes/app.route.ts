import { normalizeRoutes } from '@/utils/commom.util'

import { EResources } from '@/types/enum/resources.enum'

export const APP_ROUTES = {
  AUTH: {
    LOGIN: '/login',
  },
  COMMON: {
    INTRODUCE: '/introduce',
  },
  RESOURCES: {
    NEWS_MANAGEMENT: `/${EResources[EResources['news-management']]}`,
    ANNOUNCEMENTS_MANAGEMENT: `/${EResources[EResources['announcements-management']]}`,
  },
} as const

export const RESOURCES_ROUTES: string[] = normalizeRoutes([...Object.values(APP_ROUTES.RESOURCES)])
