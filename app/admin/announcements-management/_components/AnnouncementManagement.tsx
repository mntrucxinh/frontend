'use client'

import AnnouncementManagementTable from './AnnouncementManagementTable'
import AnnouncementManagementTabs from './AnnouncementManagementTabs'

export default function AnnouncementManagement() {
  return (
    <div>
      <AnnouncementManagementTabs />
      <AnnouncementManagementTable />
    </div>
  )
}

