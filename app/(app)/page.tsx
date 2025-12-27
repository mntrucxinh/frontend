

import React from "react"

import ImageInstruction from "@/app/(app)/_components/sections/ImageInstruction"
import Method from "./_components/sections/Method"
import Schedule from "./_components/sections/Schedule"
import Notification from "./_components/sections/Notification"
import Activity  from "./_components/sections/Activity"

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
