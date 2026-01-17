import { Skeleton } from '@heroui/react'

type Props = {
  rows?: number
  columns?: number
  showSearch?: boolean
  searchActionCount?: number
  showTabs?: boolean
  tabCount?: number
  showTabsAction?: boolean
  showHeader?: boolean
  headerLineCount?: number
}

const Block = ({ className }: { className: string }) => (
  <Skeleton className='rounded-lg'>
    <div className={`rounded-lg bg-default-200 ${className}`} />
  </Skeleton>
)

export default function AdminListSkeleton({
  rows = 6,
  columns = 6,
  showSearch = false,
  searchActionCount = 2,
  showTabs = false,
  tabCount = 4,
  showTabsAction = false,
  showHeader = false,
  headerLineCount = 2,
}: Props) {
  const headerWidths = ['w-40', 'w-72', 'w-56']
  const tableTemplate = { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }

  return (
    <div className='space-y-4'>
      {showHeader && (
        <div className='space-y-2'>
          {Array.from({ length: headerLineCount }).map((_, index) => (
            <Block
              key={`header-${index}`}
              className={`h-4 ${headerWidths[index % headerWidths.length]}`}
            />
          ))}
        </div>
      )}

      {showSearch && (
        <div className='flex flex-wrap items-center gap-3'>
          <Block className='h-10 w-72' />
          {Array.from({ length: searchActionCount }).map((_, index) => (
            <Block key={`search-action-${index}`} className='h-10 w-24' />
          ))}
        </div>
      )}

      {showTabs && (
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div className='flex flex-wrap gap-3'>
            {Array.from({ length: tabCount }).map((_, index) => (
              <Block key={`tab-${index}`} className='h-9 w-24' />
            ))}
          </div>
          {showTabsAction && <Block className='h-10 w-28' />}
        </div>
      )}

      <div className='rounded-xl border border-default-200/60 bg-white p-4'>
        <div className='mb-3 grid gap-3' style={tableTemplate}>
          {Array.from({ length: columns }).map((_, index) => (
            <Block key={`col-${index}`} className='h-4 w-full' />
          ))}
        </div>
        <div className='space-y-3'>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={`row-${rowIndex}`} className='grid gap-3' style={tableTemplate}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Block key={`cell-${rowIndex}-${colIndex}`} className='h-5 w-full' />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
