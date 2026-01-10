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
import { Upload, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useQueryClient } from '@tanstack/react-query'

import CustomInput from '../../../../components/CustomInput'
import CustomSelect from '../../../../components/CustomSelect'
import CustomTextArea from '../../../../components/CustomTextArea'
import {
  useCreateAdminNews,
  useUpdateAdminNews,
} from '@/hook/admin-news/use-admin-news-mutation'

// ========== ZOD SCHEMA ==========
const CreateEditNewsSchema = z.object({
  title: z.string().min(3, 'Tiêu đề ít nhất 3 ký tự'),
  excerpt: z.string().optional(),
  content_html: z.string().min(10, 'Nội dung HTML ít nhất 10 ký tự'),
  status: z.enum(['draft', 'published', 'archived'], 'Vui lòng chọn trạng thái'),
  publish_to_facebook: z.boolean().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  files: z.any().optional(),
})

export type TCreateEditNews = z.infer<typeof CreateEditNewsSchema>

interface ModalCreateEditNewsProps {
  isOpen: boolean
  onClose: () => void
  isCreateModal?: boolean
  newsEdit?: {
    id?: number | string
    id_news?: string
    title: string
    excerpt?: string | null
    content_html: string
    status: 'draft' | 'published' | 'archived'
    publish_to_facebook?: boolean
    meta_title?: string | null
    meta_description?: string | null
    files?: string[] | null
  }
}

const ModalCreateEditNews = ({
  isOpen,
  onClose,
  isCreateModal,
  newsEdit,
}: ModalCreateEditNewsProps) => {
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [newFiles, setNewFiles] = useState<File[]>([])

  const defaultValues = useMemo(
    () => ({
      title: newsEdit?.title ?? '',
      excerpt: newsEdit?.excerpt ?? '',
      content_html: newsEdit?.content_html ?? '',
      status: newsEdit?.status ?? 'draft',
      publish_to_facebook: newsEdit?.publish_to_facebook ?? false,
      meta_title: newsEdit?.meta_title ?? '',
      meta_description: newsEdit?.meta_description ?? '',
      files: undefined,
    }),
    [newsEdit]
  )

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TCreateEditNews>({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(CreateEditNewsSchema),
  })

  const queryClient = useQueryClient()
  const { mutateAsync: createNews, isPending: isCreating } = useCreateAdminNews()
  const { mutateAsync: updateNews, isPending: isUpdating } = useUpdateAdminNews()
  const isSubmitting = isCreating || isUpdating

  const watchStatus = watch('status')
  const isCreateMode = isCreateModal ?? !newsEdit

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

  const handleClose = () => {
    reset(defaultValues)
    setNewFiles([])
    setPreviewUrls([])
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
    return err?.response?.data?.message || err?.message || 'Co loi xay ra'
  }

  // Submit handler
  const handleSubmitNews = async (data: TCreateEditNews) => {
    const { files: _, ...rest } = data

    try {
      if (isCreateMode) {
        await createNews({ payload: rest, files: newFiles })
      } else {
        const newsId = newsEdit?.id_news ?? newsEdit?.id
        if (!newsId) {
          throw new Error('Missing news id')
        }
        await updateNews({ id: newsId, payload: rest, files: newFiles })
      }

      addToast({
        color: 'success',
        title: 'Thành công',
        description: isCreateMode ? 'Tạo tin tức thành công' : 'Cập nhật tin tức thành công',
      })
      queryClient.invalidateQueries({ queryKey: ['admin-news'] })
      handleClose()
    } catch (error) {
      addToast({
        color: 'danger',
        title: 'Thất bại',
        description: getErrorMessage(error),
      })
    }
  }

  useEffect(() => {
    reset(defaultValues)
    setNewFiles([])
  }, [newsEdit, reset, defaultValues])

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
            <ModalHeader>{isCreateMode ? 'Tạo tin tức mới' : 'Chỉnh sửa tin tức'}</ModalHeader>

            <form onSubmit={handleSubmit(handleSubmitNews)}>
              <ModalBody>
                {/* ✅ set height cố định để 2 cột scroll riêng */}
                <div className='grid grid-cols-2 gap-6'>
                  {/* LEFT: FORM FIELDS (scroll) */}
                  <div className='col-span-2 lg:col-span-1'>
                    <div className='flex max-h-[60vh] flex-col gap-5 overflow-y-auto p-2'>
                      <CustomInput
                        label='Tiêu đề bài viết'
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

                      {/* Row: status + publish fb */}
                      <div className='grid grid-cols-2 gap-4'>
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

                        {/* ✅ FIX lỗi: KHÔNG {...field} */}
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
                              Đăng lên Facebook
                            </Checkbox>
                          )}
                        />
                      </div>

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
                      {newFiles.length === 0 ? (
                        <div className='col-span-full rounded-xl border border-dashed p-6 text-center text-sm text-foreground/50'>
                          Chưa có file mới.
                        </div>
                      ) : (
                        newFiles.map((file, index) => (
                          <div
                            key={`${file.name}-${file.lastModified}`}
                            className='relative aspect-square overflow-hidden rounded-xl border'
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
                        ))
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
                  {isCreateMode ? 'Tạo tin' : 'Lưu thay đổi'}
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalCreateEditNews
