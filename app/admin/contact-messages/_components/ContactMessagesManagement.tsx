'use client'

import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button, Input } from '@heroui/react'
import { Search } from 'lucide-react'

import ContactMessagesTable from './ContactMessagesTable'
import ContactMessagesTabs from './ContactMessagesTabs'

export default function ContactMessagesManagement() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const q = searchParams.get('q') ?? ''
  const [searchValue, setSearchValue] = useState(q)

  useEffect(() => {
    setSearchValue(q)
  }, [q])

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextValue = searchValue.trim()
    const params = new URLSearchParams(searchParams.toString())
    if (nextValue) {
      params.set('q', nextValue)
    } else {
      params.delete('q')
    }
    params.set('page', '1')
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  const handleClearSearch = () => {
    setSearchValue('')
    const params = new URLSearchParams(searchParams.toString())
    params.delete('q')
    params.set('page', '1')
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  return (
    <div className='space-y-6'>
      <form
        className='flex flex-wrap items-center gap-3'
        onSubmit={handleSearchSubmit}
      >
        <Input
          value={searchValue}
          onValueChange={setSearchValue}
          placeholder='Tìm theo tên, email hoặc số điện thoại'
          startContent={<Search className='size-4 text-default-400' />}
          className='max-w-sm'
          aria-label='Tìm theo tên, email hoặc số điện thoại'
        />
        <Button color='primary' type='submit'>
          Tìm kiếm
        </Button>
        <Button variant='flat' type='button' onPress={handleClearSearch}>
          Xóa lọc
        </Button>
      </form>
      <ContactMessagesTabs />
      <ContactMessagesTable />
    </div>
  )
}
