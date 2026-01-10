'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { addToast, Spinner } from '@heroui/react'

import ConfirmModal from '@/components/ConfirmModal'
import { useDeleteAdminNews } from '@/hook/admin-news/use-admin-news-mutation'
import { useAdminNewsDetail } from '@/hook/admin-news/use-admin-news-query'

import ModalCreateEditNews from '../../_components/ModalCreateEditNews'
import NewsDetailBreadCrumbs from './NewsDetailBreadCrumbs'
import NewsDetailContent from './NewsDetailContent'

export default function NewsDetailInformation() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const newsId = params?.id

  const { data: news, isLoading, isError, error } = useAdminNewsDetail(newsId)
  const { mutateAsync: deleteNews, isPending: isDeleting } = useDeleteAdminNews()

  const getErrorMessage = (err: unknown) => {
    const detail = (err as any)?.response?.data?.detail
    if (typeof detail === 'string') return detail
    if (Array.isArray(detail) && detail[0]?.msg) return detail[0].msg
    if (typeof detail?.message === 'string') return detail.message
    return (err as any)?.response?.data?.message || (err as any)?.message || 'Co loi xay ra'
  }

  const handleConfirmDelete = async () => {
    if (!news?.id) return
    try {
      await deleteNews({ id: news.id })
      addToast({
        color: 'success',
        title: 'Thành công',
        description: 'Xoa tin tuc thanh cong',
      })
      queryClient.invalidateQueries({ queryKey: ['admin-news'] })
      router.push('/admin/news-management')
    } catch (err) {
      addToast({
        color: 'danger',
        title: 'That bai',
        description: getErrorMessage(err),
      })
    } finally {
      setIsDeleteOpen(false)
    }
  }

  if (isLoading) {
    return (
      <div className='flex justify-center py-16'>
        <Spinner color='primary' />
      </div>
    )
  }

  if (!news || isError) {
    return (
      <div className='py-16 text-center text-default-500'>
        {getErrorMessage(error) || 'Khong tim thay tin tuc'}
      </div>
    )
  }

  const editingPayload = {
    id: news.id,
    title: news.title,
    excerpt: news.excerpt ?? undefined,
    content_html: news.content_html,
    status: news.status,
    meta_title: news.meta_title ?? undefined,
    meta_description: news.meta_description ?? undefined,
  }

  return (
    <div>
      <NewsDetailBreadCrumbs id={news.id} metaTitle={news.meta_title ?? news.title} />
      <NewsDetailContent
        news={{
          title: news.title,
          slug: news.slug,
          excerpt: news.excerpt,
          content_html: news.content_html,
          status: news.status,
          meta_title: news.meta_title,
          meta_description: news.meta_description,
          content_assets: news.content_assets ?? [],
          published_at: news.published_at,
          created_at: news.created_at,
          updated_at: news.updated_at,
        }}
        onEdit={() => setIsEditOpen(true)}
        onDelete={() => setIsDeleteOpen(true)}
        isDeleting={isDeleting}
      />

      <ModalCreateEditNews
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        newsEdit={editingPayload}
      />

      {isDeleteOpen && (
        <ConfirmModal
          modalHeader='Xoa tin tuc'
          modalBody={`Ban chac chan muon xoa "${news.title}"?`}
          confirmButtonText='Xac nhan'
          cancelButtonText='Huy'
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleConfirmDelete}
          isLoading={isDeleting}
          isDisabled={isDeleting}
        />
      )}
    </div>
  )
}
