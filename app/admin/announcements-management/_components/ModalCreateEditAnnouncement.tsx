'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  addToast,
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Upload, X, FileText } from 'lucide-react'
import Image from 'next/image'
import { buildAssetUrl } from '@/utils/api-url'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useQueryClient } from '@tanstack/react-query'

import CustomInput from '../../../../components/CustomInput'
import CustomSelect from '../../../../components/CustomSelect'
import CustomTextArea from '../../../../components/CustomTextArea'
import {
  useCreateAdminAnnouncement,
  useUpdateAdminAnnouncement,
} from '@/hook/admin-announcement/use-admin-announcement-mutation'
import type { BlockCode } from '@/types/admin-announcement'

// ========== ZOD SCHEMA ==========
const CreateEditAnnouncementSchema = z.object({
  title: z.string().min(3, 'Tiêu đề ít nhất 3 ký tự'),
  excerpt: z.string().optional(),
  content_html: z.string().min(10, 'Nội dung HTML ít nhất 10 ký tự'),
  status: z.enum(['draft', 'published', 'archived'], 'Vui lòng chọn trạng thái'),
  publish_to_facebook: z.boolean().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  block_code: z.enum(['bee', 'mouse', 'bear', 'dolphin'], 'Vui lòng chọn khối'),
  files: z.any().optional(),
})

export type TCreateEditAnnouncement = z.infer<typeof CreateEditAnnouncementSchema>

interface ModalCreateEditAnnouncementProps {
  isOpen: boolean
  onClose: () => void
  isCreateModal?: boolean
  announcementEdit?: {
    id?: number | string
    id_announcement?: string
    title: string
    excerpt?: string | null
    content_html: string
    status: 'draft' | 'published' | 'archived'
    publish_to_facebook?: boolean
    meta_title?: string | null
    meta_description?: string | null
    block_code: BlockCode
    files?: string[] | null
    content_assets?: Array<{
      position: number
      caption?: string | null
      asset: {
        id: number
        public_id: string
        url: string
        mime_type: string
        byte_size?: number | null
        width?: number | null
        height?: number | null
      }
    }> | null
  }
}

const ModalCreateEditAnnouncement = ({
  isOpen,
  onClose,
  isCreateModal,
  announcementEdit,
}: ModalCreateEditAnnouncementProps) => {
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [existingFiles, setExistingFiles] = useState<
    Array<{
      id: number | string
      url: string
      mime_type: string
      caption?: string | null
    }>
  >([])

  const defaultValues = useMemo(
    () => ({
      title: announcementEdit?.title ?? '',
      excerpt: announcementEdit?.excerpt ?? '',
      content_html: announcementEdit?.content_html ?? '',
      status: announcementEdit?.status ?? 'draft',
      publish_to_facebook: announcementEdit?.publish_to_facebook ?? false,
      meta_title: announcementEdit?.meta_title ?? '',
      meta_description: announcementEdit?.meta_description ?? '',
      block_code: announcementEdit?.block_code ?? 'bee',
      files: undefined,
    }),
    [announcementEdit]
  )

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TCreateEditAnnouncement>({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(CreateEditAnnouncementSchema),
  })

  const queryClient = useQueryClient()
  const { mutateAsync: createAnnouncement, isPending: isCreating } = useCreateAdminAnnouncement()
  const { mutateAsync: updateAnnouncement, isPending: isUpdating } = useUpdateAdminAnnouncement()
  const isSubmitting = isCreating || isUpdating

  const watchStatus = watch('status')
  const isCreateMode = isCreateModal ?? !announcementEdit

  // ✅ nếu không published thì tự tắt publish_to_facebook
  useEffect(() => {
    if (watchStatus !== 'published') {
      setValue('publish_to_facebook', false, { shouldDirty: true, shouldValidate: true })
    }
  }, [watchStatus, setValue])

  // Handle files
  const handleAddFiles = (files: FileList | null) => {
    if (!files) return
    setNewFiles((prev) => [...prev, ...Array.from(files)])
  }

  const handleRemoveFile = (index: number) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleRemoveExistingFile = (id: number | string) => {
    setExistingFiles((prev) => prev.filter((file) => file.id !== id))
  }

  const handleClose = () => {
    reset(defaultValues)
    setNewFiles([])
    setPreviewUrls([])
    setExistingFiles([])
    onClose()
  }

  // Preview file URLs
  useEffect(() => {
    const urls = newFiles.map((f) => URL.createObjectURL(f))
    setPreviewUrls(urls)
    return () => urls.forEach((u) => URL.revokeObjectURL(u))
  }, [newFiles])

  const getErrorMessage = (error: unknown) => {
    const err = error as any
    const detail = err?.response?.data?.detail
    if (typeof detail === 'string') return detail
    if (Array.isArray(detail) && detail[0]?.msg) return detail[0].msg
    if (typeof detail?.message === 'string') return detail.message
    return err?.response?.data?.message || err?.message || 'Có lỗi xảy ra'
  }

  // Submit handler
  const handleSubmitAnnouncement = async (data: TCreateEditAnnouncement) => {
    const { files: _, ...rest } = data

    try {
      if (isCreateMode) {
        await createAnnouncement({ payload: rest, files: newFiles })
      } else {
        const announcementId = announcementEdit?.id_announcement ?? announcementEdit?.id
        if (!announcementId) {
          throw new Error('Missing announcement id')
        }
        await updateAnnouncement({ id: announcementId, payload: rest, files: newFiles })
      }

      addToast({
        color: 'success',
        title: 'Thành công',
        description: isCreateMode ? 'Tạo thông báo thành công' : 'Cập nhật thông báo thành công',
      })
      queryClient.invalidateQueries({ queryKey: ['admin-announcement'] })
      handleClose()
    } catch (error) {
      addToast({
        color: 'danger',
        title: 'Thất bại',
        description: getErrorMessage(error),
      })
    }
  }

  // Load existing files when modal opens for editing
  useEffect(() => {
    if (isOpen && !isCreateMode && announcementEdit) {
      // Reset new files when opening
      setNewFiles([])
      
      // Load existing files
      if (announcementEdit.content_assets && Array.isArray(announcementEdit.content_assets) && announcementEdit.content_assets.length > 0) {
        const files = announcementEdit.content_assets
          .sort((a, b) => (a.position || 0) - (b.position || 0))
          .map((item) => ({
            id: item.asset?.id || item.asset?.public_id,
            url: item.asset?.url || '',
            mime_type: item.asset?.mime_type || '',
            caption: item.caption || null,
          }))
          .filter((file) => file.id && file.url) // Filter out invalid files
        setExistingFiles(files)
      } else {
        setExistingFiles([])
      }
    } else if (isOpen && isCreateMode) {
      // Reset for create mode
      setExistingFiles([])
      setNewFiles([])
    } else if (!isOpen) {
      // Clear when modal closes
      setExistingFiles([])
      setNewFiles([])
    }
  }, [isOpen, isCreateMode, announcementEdit])

  useEffect(() => {
    if (isOpen) {
      reset(defaultValues)
    }
  }, [isOpen, announcementEdit, reset, defaultValues])

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size='5xl'
      placement='center'
      classNames={{
        header: 'justify-center text-2xl font-semibold text-ct-blue',
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>{isCreateMode ? 'Tạo thông báo mới' : 'Chỉnh sửa thông báo'}</ModalHeader>

            <form onSubmit={handleSubmit(handleSubmitAnnouncement)}>
              <ModalBody>
                {/* ✅ set height cố định để 2 cột scroll riêng */}
                <div className='grid grid-cols-2 gap-6'>
                  {/* LEFT: FORM FIELDS (scroll) */}
                  <div className='col-span-2 lg:col-span-1'>
                    <div className='flex max-h-[60vh] flex-col gap-5 overflow-y-auto p-2'>
                      <CustomInput
                        label='Tiêu đề thông báo'
                        placeholder='Nhập tiêu đề'
                        {...register('title')}
                        validationErrorMessage={errors.title?.message}
                      />

                      <CustomTextArea
                        label='Mô tả ngắn'
                        placeholder='Nhập mô tả ngắn (excerpt)'
                        {...register('excerpt')}
                      />

                      <CustomTextArea
                        label='Nội dung HTML'
                        placeholder='Dán nội dung HTML vào đây'
                        {...register('content_html')}
                        validationErrorMessage={errors.content_html?.message}
                      />

                      {/* Row: block_code + status */}
                      <div className='grid grid-cols-2 gap-4'>
                        <Controller
                          name='block_code'
                          control={control}
                          render={({ field }) => (
                            <CustomSelect
                              label='Khối'
                              placeholder='Chọn khối'
                              selectedKeys={[field.value]}
                              onChange={(e) => {
                                const v = e.target.value as BlockCode
                                field.onChange(v)
                              }}
                              options={[
                                { key: 'bee', value: 'Bee' },
                                { key: 'mouse', value: 'Mouse' },
                                { key: 'bear', value: 'Bear' },
                                { key: 'dolphin', value: 'Dolphin' },
                              ]}
                              validationErrorMessage={errors.block_code?.message}
                            />
                          )}
                        />

                        <Controller
                          name='status'
                          control={control}
                          render={({ field }) => (
                            <CustomSelect
                              label='Trạng thái'
                              placeholder='Chọn trạng thái'
                              selectedKeys={[field.value]}
                              onChange={(e) => {
                                const v = e.target.value as 'draft' | 'published' | 'archived'
                                field.onChange(v)
                              }}
                              options={[
                                { key: 'draft', value: 'Nháp' },
                                { key: 'published', value: 'Công khai' },
                                { key: 'archived', value: 'Lưu trữ' },
                              ]}
                              validationErrorMessage={errors.status?.message}
                            />
                          )}
                        />
                      </div>

                      {/* Row: publish_to_facebook */}
                      <Controller
                        name='publish_to_facebook'
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            isSelected={!!field.value}
                            isDisabled={watchStatus !== 'published'}
                            onValueChange={field.onChange}
                            classNames={{ label: 'text-foreground' }}
                          >
                            {isCreateMode ? 'Đăng lên Facebook' : 'Sửa trên Facebook'}
                          </Checkbox>
                        )}
                      />

                      <CustomInput
                        label='SEO Title'
                        placeholder='Nhập tiêu đề SEO'
                        {...register('meta_title')}
                      />

                      <CustomTextArea
                        label='SEO Description'
                        placeholder='Nhập mô tả SEO'
                        {...register('meta_description')}
                      />
                    </div>
                  </div>

                  {/* RIGHT: FILES */}
                  <div className='col-span-2 space-y-5 lg:col-span-1'>
                    <p className='text-ct-blue text-lg font-semibold'>File đính kèm (ảnh/video)</p>

                    <Controller
                      name='files'
                      control={control}
                      render={({ field }) => (
                        <>
                          <input
                            ref={(el) => {
                              field.ref(el)
                              fileRef.current = el
                            }}
                            type='file'
                            multiple
                            accept='image/*,video/*'
                            className='hidden'
                            onBlur={field.onBlur}
                            onChange={(e) => {
                              field.onChange(e.target.files)
                              handleAddFiles(e.target.files)
                            }}
                          />

                          <Button
                            type='button'
                            variant='bordered'
                            onPress={() => fileRef.current?.click()}
                            startContent={<Upload className='size-4' />}
                            className='w-full justify-center'
                          >
                            Chọn file
                          </Button>
                        </>
                      )}
                    />

                    {/* Scroll preview */}
                    <div className='grid max-h-[44vh] grid-cols-3 gap-3 overflow-y-auto pr-1'>
                      {/* Existing files */}
                      {existingFiles.map((file) => {
                        const assetUrl = buildAssetUrl(file.url)
                        const isVideo = file.mime_type?.startsWith('video/')
                        const isImage = file.mime_type?.startsWith('image/')

                        return (
                          <div
                            key={file.id}
                            className='relative aspect-square overflow-hidden rounded-xl border border-default-200 group'
                          >
                            {isVideo ? (
                              <video
                                src={assetUrl}
                                className='h-full w-full object-cover'
                                controls
                                preload='metadata'
                              />
                            ) : isImage ? (
                              <Image
                                src={assetUrl}
                                alt={file.caption || 'Existing file'}
                                fill
                                className='object-cover'
                                unoptimized
                              />
                            ) : (
                              <div className='h-full w-full bg-default-100 flex items-center justify-center'>
                                <FileText className='size-8 text-default-400' />
                              </div>
                            )}

                            <Button
                              onPress={() => handleRemoveExistingFile(file.id as number | string)}
                              isIconOnly
                              color='danger'
                              radius='full'
                              className='absolute right-2 top-2 h-6 w-6 min-w-0 opacity-0 group-hover:opacity-100 transition-opacity'
                            >
                              <X className='size-4 text-white' />
                            </Button>
                            {file.caption && (
                              <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1.5'>
                                <p className='text-xs text-white truncate'>{file.caption}</p>
                              </div>
                            )}
                          </div>
                        )
                      })}

                      {/* New files */}
                      {newFiles.map((file, index) => (
                        <div
                          key={`new-${file.name}-${file.lastModified}`}
                          className='relative aspect-square overflow-hidden rounded-xl border border-primary-200 group'
                        >
                          {file.type.startsWith('video') ? (
                            <video
                              src={previewUrls[index]}
                              className='h-full w-full object-cover'
                              controls
                            />
                          ) : (
                            <img
                              src={previewUrls[index]}
                              alt='preview'
                              className='h-full w-full object-cover'
                              loading='lazy'
                            />
                          )}

                          <div className='absolute top-1 left-1 bg-primary text-white text-xs px-1.5 py-0.5 rounded'>
                            Mới
                          </div>

                          <Button
                            onPress={() => handleRemoveFile(index)}
                            isIconOnly
                            color='danger'
                            radius='full'
                            className='absolute right-2 top-2 h-6 w-6 min-w-0'
                          >
                            <X className='size-4 text-white' />
                          </Button>
                        </div>
                      ))}

                      {/* Empty state */}
                      {existingFiles.length === 0 && newFiles.length === 0 && (
                        <div className='col-span-full rounded-xl border border-dashed p-6 text-center text-sm text-foreground/50'>
                          Chưa có file nào.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  color='danger'
                  variant='light'
                  type='button'
                  onPress={handleClose}
                  isDisabled={isSubmitting}
                >
                  Hủy
                </Button>
                <Button color='primary' type='submit' isLoading={isSubmitting}>
                  {isCreateMode ? 'Tạo thông báo' : 'Lưu thay đổi'}
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalCreateEditAnnouncement

