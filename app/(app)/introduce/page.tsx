'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import History from './_components/sections/History'
import CoreValues from './_components/sections/CoreValues'
import MissionVision from './_components/sections/MissionVision'
import StaffTeam from './_components/sections/StaffTeam'
import Location from './_components/sections/Location'
import Facility from './_components/sections/Facility'


const GeneralPage = () => {
  return (
    <div className='bg-white text-gray-800'>
      <History />
      <CoreValues />
      <MissionVision />
      <StaffTeam />
      <Location />
      <Facility />
    </div>
  )
}

export default GeneralPage
