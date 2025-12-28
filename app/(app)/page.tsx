import React from 'react'

import ImageInstruction from '@/app/(app)/_components/sections/ImageInstruction'

import Activity from './_components/sections/Activity'
import Method from './_components/sections/Method'
import Notification from './_components/sections/Notification'
import Schedule from './_components/sections/Schedule'

const IMAGES = ['/assets/images/ex1.jpg', '/assets/images/ex2.jpg', '/assets/images/ex3.jpg']

const LandingPage = () => {
  return (
    <div>
      <ImageInstruction />
      <Method />
      <Schedule />
      <Notification />
      <Activity />
    </div>
  )
}

export default LandingPage
