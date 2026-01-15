'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import History from './_components/sections/History'
import Location from './_components/sections/Location'
import StaffTeam from './_components/sections/StaffTeam'

const GeneralPage = () => {
  return (
    <div className='bg-white text-gray-800'>
      <History />
      <StaffTeam />
      <Location />
    </div>
  )
}

export default GeneralPage
