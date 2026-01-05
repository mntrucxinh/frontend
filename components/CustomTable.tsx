'use client'

import type React from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { type TPaginationResponse } from '@/validators/index'
import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  type Selection,
  type SelectionMode,
  type SlotsToClasses,
  type SortDescriptor,
} from '@heroui/react'

import ConfirmModal from './ConfirmModal'
import CustomSelect from './CustomSelect'

type Column = {
  uid: string
  name: string
  sortable?: boolean
}

export type CustomTableProps<T> = {
  tableKey?: React.Key | null
  addBorderBottom?: boolean
  columns: Column[]
  data: T[]
  statusOptions?: { uid: number; label: string }[]
  renderCell: (item: T, columnKey: string) => React.ReactNode
  totalLabel?: string
  paginationResponse: TPaginationResponse | undefined
  isPushParams?: boolean
  page?: number
  setPage?: (page: number) => void
  limit?: number
  setLimit?: (limit: number) => void
  disabledKeys?: string[]
  externalSelectedKeys?: string[]
  setSelectedKeysArray?: (keys: string[]) => void
  selectionMode?: SelectionMode
  onSortChange?: (columnKey: string) => void
  hideTopContent?: boolean
  isLoading?: boolean
  hideBottomContent?: boolean
  hideSelectedItems?: boolean
  maxHeight?: string
  tableClassNames?: SlotsToClasses<
    | 'table'
    | 'wrapper'
    | 'base'
    | 'tbody'
    | 'td'
    | 'tfoot'
    | 'th'
    | 'thead'
    | 'tr'
    | 'sortIcon'
    | 'emptyWrapper'
    | 'loadingWrapper'
  >
  paginationClassNames?: SlotsToClasses<
    | 'wrapper'
    | 'base'
    | 'item'
    | 'prev'
    | 'next'
    | 'cursor'
    | 'forwardIcon'
    | 'ellipsis'
    | 'chevronNext'
  >
  buttonClassNames?: string
}

function CustomTable<T extends { id: string | number }>({
  tableKey,
  addBorderBottom = false,
  columns,
  data,
  renderCell,
  paginationResponse,
  isPushParams = true,
  page,
  setPage,
  limit,
  setLimit,
  disabledKeys,
  externalSelectedKeys,
  setSelectedKeysArray,
  selectionMode = 'multiple',
  onSortChange,
  hideTopContent,
  hideBottomContent,
  hideSelectedItems,
  isLoading,
  tableClassNames = { wrapper: 'h-[500px] pt-0 pb-4 px-0' },
  paginationClassNames,
}: Readonly<CustomTableProps<T>>) {
  const INITIAL_VISIBLE_COLUMNS = columns.map((col) => col.uid)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathName = usePathname()
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))

  const [visibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS))
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || page || 1)
  const [rowsPerPage, setRowsPerPage] = useState(Number(searchParams.get('limit')) || limit || 10)

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: columns[0].uid,
    direction: 'ascending',
  })
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  useEffect(() => {
    if (
      externalSelectedKeys !== undefined &&
      (selectedKeys === 'all' ||
        new Set(externalSelectedKeys).size !== new Set(selectedKeys).size ||
        Array.from(new Set(externalSelectedKeys)).some((key) => !new Set(selectedKeys).has(key)))
    ) {
      setSelectedKeys(new Set(externalSelectedKeys))
    }
  }, [externalSelectedKeys, selectedKeys])

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid))
  }, [visibleColumns, columns])

  const pages = paginationResponse?.total_pages ?? 1

  const updateRouter = useCallback(
    (newPage: number, newLimit: number) => {
      if (isPushParams) {
        const params = new URLSearchParams(window.location.search)
        params.set('page', String(newPage))
        params.set('limit', String(newLimit))
        router.push(`${pathName}?${params.toString()}`)
      } else {
        setLimit && setLimit(newLimit)
        setPage && setPage(newPage)
      }
    },
    [isPushParams, pathName, router, setLimit, setPage]
  )

  const handleSortClick = (columnKey: string) => {
    if (onSortChange) {
      onSortChange(columnKey)
    }
  }

  const filteredItems = useMemo(() => {
    if (!Array.isArray(data)) {
      return []
    }

    const filteredData = [...data]
    return filteredData
  }, [data])

  const handleChangePagination = useCallback(
    (selectedPage: number) => {
      setCurrentPage(selectedPage)
      updateRouter(selectedPage, rowsPerPage)
    },
    [rowsPerPage, updateRouter]
  )

  const handleChangeRowPerPage = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newRowsPerPage = Number(e.target.value)
      setRowsPerPage(newRowsPerPage)
      setCurrentPage(1)
      updateRouter(1, newRowsPerPage)
    },
    [updateRouter]
  )

  const handleSelectionChange = (keys: Selection) => {
    const selectedKeysArray = Array.from(keys).map(String)
    const disabledKeySet = new Set(disabledKeys)

    // Nếu chọn "all", lấy toàn bộ ID từ data trừ các khóa bị disable
    const filteredKeys =
      keys === 'all'
        ? data.map((item) => String(item.id)).filter((key) => !disabledKeySet.has(key)) // Lọc bỏ các id bị vô hiệu hóa
        : selectedKeysArray.filter((key) => !disabledKeySet.has(key)) // Lọc bỏ các id bị vô hiệu hóa trong trường hợp chọn một số item cụ thể

    // Cập nhật state local với các keys được chọn
    setSelectedKeys(new Set(filteredKeys))
    // Nếu có hàm cập nhật context được truyền vào, gọi để cập nhật state bên ngoài (nếu có)
    setSelectedKeysArray?.(filteredKeys)
  }

  const topContent = useMemo(() => {
    if (hideTopContent) return null

    return (
      <div className='flex flex-col gap-14'>
        <div
          className={`flex items-center ${hideSelectedItems ? 'justify-end' : 'justify-between'} `}
        >
          <span
            className={`text-ct-secondary w-[30%] text-small ${hideSelectedItems ? 'hidden' : ''}`}
          >
            {selectedKeys === 'all'
              ? 'All items selected'
              : `${selectedKeys.size.toString()} của ${filteredItems.length.toString()} đã chọn`}
          </span>

          <label
            htmlFor='rowsPerPage'
            className='flex items-center gap-5 text-default-400 text-small'
          >
            <span>Số hàng mỗi trang:</span>

            <CustomSelect
              aria-label='rows per page'
              disallowEmptySelection
              className='w-28'
              defaultSelectedKeys={[String(rowsPerPage)]}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChangeRowPerPage(e)}
              options={[
                { value: '10', key: '10' },
                { value: '20', key: '20' },
                { value: '30', key: '30' },
              ]}
            />
          </label>
        </div>
      </div>
    )
  }, [
    hideTopContent,
    rowsPerPage,
    handleChangeRowPerPage,
    filteredItems.length,
    hideSelectedItems,
    selectedKeys,
  ])

  const bottomContent = useMemo(() => {
    if (hideBottomContent) return null

    return (
      <div className='flex items-center justify-between p-2'>
        <span className='text-default-400 text-small'>
          Tổng cộng {paginationResponse?.total_items} mục
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color='primary'
          page={currentPage}
          total={pages}
          onChange={handleChangePagination}
          classNames={paginationClassNames}
        />
      </div>
    )
  }, [
    currentPage,
    handleChangePagination,
    hideBottomContent,
    pages,
    paginationClassNames,
    paginationResponse?.total_items,
  ])

  return (
    <>
      <Table
        key={tableKey}
        aria-label='Custom table with sorting and pagination'
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement='outside'
        classNames={tableClassNames}
        selectedKeys={selectedKeys}
        selectionMode={selectionMode}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement='outside'
        onSelectionChange={handleSelectionChange}
        onSortChange={setSortDescriptor}
        radius='sm'
        disabledKeys={disabledKeys}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
              onClick={() => column.sortable && handleSortClick(column.uid)}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent='Không tìm thấy dữ liệu'
          items={data}
          isLoading={isLoading}
          loadingContent={<Spinner color='primary' />}
        >
          {(item) => {
            return (
              <TableRow key={String(item.id)} className='border-ct-border h-[50px] border-b'>
                {(columnKey) => (
                  <TableCell
                    className={addBorderBottom ? 'border-ct-border border-b' : ''}
                    onMouseDown={(e) => e.stopPropagation()}
                    onPointerDown={(e) => e.stopPropagation()}
                    key={`${String(item.id)}-${String(columnKey)}`}
                  >
                    {renderCell(item, String(columnKey))}
                  </TableCell>
                )}
              </TableRow>
            )
          }}
        </TableBody>
      </Table>

      {isDeleteModalOpen && (
        <ConfirmModal
          modalHeader='Xóa bảng ghi'
          modalBody='Bạn có chắc chắn muốn xóa những bản ghi đã chọn không?'
          confirmButtonText='Xác nhận'
          cancelButtonText='Hủy'
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </>
  )
}

export default CustomTable
