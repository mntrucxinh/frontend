import React from 'react'

import ImageInstruction from '@/app/(app)/_components/sections/ImageInstruction'
import Activity from './_components/sections/Activity'
import Notification from './_components/sections/Notification'
import Schedule from './_components/sections/Schedule'
import CoreValues from './_components/sections/CoreValues'

const LandingPage = () => {
  return (
    <div className='overflow-hidden'>
      {/* Hero / Banner */}
      <ImageInstruction />

      {/* Giá trị cốt lõi */}
      <CoreValues />

      {/* Hoạt động & thời gian biểu */}
      <Schedule />

      {/* Hoạt động nổi bật (video) */}
      <Activity />

      {/* Thông báo & tin tức */}
      {/* <Notification /> */}
    </div>
  )
}

export default LandingPage
