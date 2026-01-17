import { Skeleton } from '@heroui/react'

const Block = ({ className }: { className: string }) => (
  <Skeleton className='rounded-lg'>
    <div className={`rounded-lg bg-default-200 ${className}`} />
  </Skeleton>
)

export default function AdminDetailSkeleton() {
  return (
    <div className='space-y-6'>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div className='space-y-2'>
          <Block className='h-4 w-56' />
          <Block className='h-4 w-40' />
        </div>
        <div className='flex gap-2'>
          <Block className='h-9 w-24' />
          <Block className='h-9 w-24' />
        </div>
      </div>

      <div className='grid gap-6 lg:grid-cols-[2fr,1fr]'>
        <div className='space-y-3'>
          <Block className='h-64 w-full' />
          <Block className='h-4 w-2/3' />
          <Block className='h-4 w-1/2' />
        </div>
        <div className='space-y-3'>
          <Block className='h-48 w-full' />
          <Block className='h-4 w-3/4' />
          <Block className='h-4 w-2/3' />
        </div>
      </div>
    </div>
  )
}
