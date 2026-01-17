const Block = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded-xl bg-gray-200 ${className}`} />
)

export default function NoticeSidebarSkeleton() {
  return (
    <aside className='lg:w-1/4 xl:w-1/5'>
      <div className='lg:sticky lg:top-6 lg:z-10'>
        <div className='rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-200/50'>
          <div className='mb-6 space-y-2'>
            <Block className='h-6 w-24' />
            <Block className='h-1 w-16' />
          </div>
          <div className='space-y-3'>
            {Array.from({ length: 5 }).map((_, index) => (
              <Block key={`sidebar-item-${index}`} className='h-10 w-full' />
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
