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
    NEWS_MANAGEMENT: `/admin/${EResources[EResources['news-management']]}`,
    ANNOUNCEMENTS_MANAGEMENT: `/admin/${EResources[EResources['announcements-management']]}`,
    CONTACT_MESSAGES: `/admin/${EResources[EResources['contact-messages']]}`,
  },
} as const

export const RESOURCES_ROUTES: string[] = normalizeRoutes([...Object.values(APP_ROUTES.RESOURCES)])
