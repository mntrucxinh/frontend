'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from '@heroui/react'
import { Bell, ChevronDown, Search } from 'lucide-react'

export default function HeaderAdmin() {
  return (
    <header className='flex h-14 w-full items-center justify-between border-b border-black/10 bg-white/95 px-4 shadow-sm backdrop-blur'>
      <Link href='' className='flex items-center gap-2'>
        <Image
          width={34}
          height={34}
          src='/assets/images/logo_truc_xinh.png'
          alt='Logo'
          className='rounded'
        />
        <span className='text-lg font-semibold text-primary'>Trúc Xinh</span>
      </Link>

      <div className='flex items-center gap-2'>
        <Dropdown placement='bottom-end'>
          <DropdownTrigger>
            <Button
              variant='flat'
              className='h-10 gap-2 rounded-xl border border-black/10 bg-white px-2 hover:bg-black/[0.03]'
              endContent={<ChevronDown className='size-4' />}
            >
              <Avatar size='sm' src='https://i.pravatar.cc/150?u=a04258114e29026702d' />
              <div className='hidden flex-col items-start leading-none md:flex'>
                <span className='text-sm font-semibold text-foreground'>Quản trị viên</span>
                <span className='text-xs text-foreground/70'>Quản lý Trúc Xinh</span>
              </div>
            </Button>
          </DropdownTrigger>

          <DropdownMenu>
            <DropdownItem key='logout'>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  )
}
