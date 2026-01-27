const Block = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded-xl bg-gray-200 ${className}`} />
)

export default function NoticeListSkeleton() {
  const cards = Array.from({ length: 6 })

  return (
    <div className='space-y-8'>
      <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
        <div className='space-y-3'>
          <Block className='h-10 w-56' />
          <Block className='h-4 w-28' />
        </div>
        <Block className='h-12 w-full md:max-w-md' />
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {cards.map((_, index) => (
          <div
            key={`notice-skeleton-${index}`}
            className='flex h-full min-h-[430px] flex-col rounded-2xl border border-gray-200/60 bg-white p-5 shadow-sm'
          >
            <Block className='mb-4 h-44 w-full' />
            <Block className='mb-3 h-5 w-4/5' />
            <Block className='mb-2 h-4 w-full' />
            <Block className='mb-6 h-4 w-5/6' />
            <Block className='mt-auto h-4 w-24' />
          </div>
        ))}
      </div>

      <div className='flex items-center justify-center gap-2'>
        <Block className='h-10 w-20' />
        <Block className='size-10' />
        <Block className='size-10' />
        <Block className='h-10 w-20' />
      </div>
    </div>
  )
}
