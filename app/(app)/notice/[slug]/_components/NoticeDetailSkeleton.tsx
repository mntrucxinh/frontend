const Block = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded-xl bg-gray-200 ${className}`} />
)

export default function NoticeDetailSkeleton() {
  return (
    <div className='mx-auto max-w-7xl px-4 py-8 md:py-12'>
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12'>
        <div className='lg:col-span-2 space-y-6'>
          <div className='space-y-3'>
            <Block className='h-10 w-3/4' />
            <Block className='h-6 w-44' />
          </div>
          <Block className='h-64 w-full' />
          <div className='space-y-3'>
            <Block className='h-4 w-full' />
            <Block className='h-4 w-11/12' />
            <Block className='h-4 w-10/12' />
            <Block className='h-4 w-9/12' />
          </div>
        </div>
        <aside className='space-y-4'>
          <div className='rounded-3xl bg-white p-6 shadow-2xl'>
            <div className='space-y-3'>
              <Block className='h-6 w-36' />
              <Block className='h-1 w-16' />
            </div>
            <div className='mt-6 space-y-3'>
              {Array.from({ length: 5 }).map((_, index) => (
                <Block key={`detail-item-${index}`} className='h-10 w-full' />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
