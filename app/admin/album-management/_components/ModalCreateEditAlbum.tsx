// app/(admin)/album-management/_components/ModalCreateEditAlbum.tsx
'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import {
  addToast,
  Button,
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

import CustomInput from '@/components/CustomInput'
import CustomSelect from '@/components/CustomSelect'
import CustomTextArea from '@/components/CustomTextArea'

import LazyMediaThumb from '../../_components/LazyMediaThumb'
import LazyRemoteImageThumb from '../../_components/LazyRemoteImageThumb'
import LazyRemoteVideoThumb from '../../_components/LazyRemoteVideoThumb'
import type { Album, AlbumStatus } from './AlbumManagementTable'

const CreateEditAlbumSchema = z.object({
  title: z.string().min(3, 'Tên album ít nhất 3 ký tự'),
  description: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived'], 'Vui lòng chọn trạng thái'),
  cover: z.any().optional(),
  files: z.any().optional(),
})

export type TCreateEditAlbum = z.infer<typeof CreateEditAlbumSchema>

type SubmitArgs = {
  isCreate: boolean
  albumId?: Album['id']
  payload: Omit<TCreateEditAlbum, 'cover' | 'files'>
  coverFile?: File | null
  newFiles: File[]
  removedImageIds: Array<number | string>
  removedVideoIds: Array<number | string>
}

type Props = {
  isOpen: boolean
  onClose: () => void
  albumEdit?: Album | null
  isCreateModal?: boolean
  onSubmit?: (args: SubmitArgs) => Promise<void> | void
}

const getVideoUrl = (v: any): string | null => {
  if (!v) return null
  if (typeof v.url === 'string') return v.url
  if (typeof v.src === 'string') return v.src
  if (typeof v.link === 'string') return v.link
  return null
}

const getVideoId = (v: any, fallback: number): number | string => {
  const id = v?.id ?? v?.public_id ?? v?.uuid
  if (typeof id === 'number' || typeof id === 'string') return id
  return `video_${fallback}`
}

export default function ModalCreateEditAlbum({
  isOpen,
  onClose,
  albumEdit,
  isCreateModal,
  onSubmit,
}: Props) {
  const coverRef = useRef<HTMLInputElement | null>(null)
  const filesRef = useRef<HTMLInputElement | null>(null)

  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string>('')

  const [newFiles, setNewFiles] = useState<File[]>([])

  const isCreateMode = isCreateModal ?? !albumEdit

  // Existing (edit)
  const [existingImagesState, setExistingImagesState] = useState<NonNullable<Album['items']>>([])
  const [existingVideosState, setExistingVideosState] = useState<NonNullable<Album['videos']>>([])
  const [removedImageIds, setRemovedImageIds] = useState<Array<number | string>>([])
  const [removedVideoIds, setRemovedVideoIds] = useState<Array<number | string>>([])

  const defaultValues = useMemo(
    () => ({
      title: albumEdit?.title ?? '',
      description: albumEdit?.description ?? '',
      status: (albumEdit?.status ?? 'draft') as AlbumStatus,
      cover: undefined,
      files: undefined,
    }),
    [albumEdit]
  )

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCreateEditAlbum>({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(CreateEditAlbumSchema),
  })

  useEffect(() => {
    reset(defaultValues)

    setNewFiles([])
    setCoverFile(null)
    setCoverPreview('')

    setExistingImagesState(albumEdit?.items ?? [])
    setExistingVideosState(albumEdit?.videos ?? [])
    setRemovedImageIds([])
    setRemovedVideoIds([])
  }, [albumEdit, defaultValues, reset])

  // Preview cover mới (1 file -> ok)
  useEffect(() => {
    if (!coverFile) {
      setCoverPreview('')
      return
    }
    const url = URL.createObjectURL(coverFile)
    setCoverPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [coverFile])

  const handleAddFiles = (files: FileList | null) => {
    if (!files) return
    setNewFiles((prev) => [...prev, ...Array.from(files)])
  }

  const handleRemoveNewFile = (index: number) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleRemoveExisting = (type: 'image' | 'video', index: number) => {
    if (type === 'image') {
      const target = existingImagesState[index]
      const id = target?.asset?.id ?? target?.asset?.public_id ?? `img_${index}`
      setRemovedImageIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
      setExistingImagesState((prev) => prev.filter((_, i) => i !== index))
      return
    }

    const target = existingVideosState[index]
    const id = getVideoId(target?.video, index)
    setRemovedVideoIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
    setExistingVideosState((prev) => prev.filter((_, i) => i !== index))
  }

  const handleClose = () => {
    reset(defaultValues)

    setNewFiles([])
    setCoverFile(null)
    setCoverPreview('')

    setExistingImagesState(albumEdit?.items ?? [])
    setExistingVideosState(albumEdit?.videos ?? [])
    setRemovedImageIds([])
    setRemovedVideoIds([])

    onClose()
  }

  const submit = async (data: TCreateEditAlbum) => {
    const { cover: _cover, files: _files, ...payload } = data

    try {
      await onSubmit?.({
        isCreate: isCreateMode,
        albumId: albumEdit?.id,
        payload,
        coverFile,
        newFiles,
        removedImageIds,
        removedVideoIds,
      })

      addToast({
        color: 'success',
        title: 'Thành công',
        description: isCreateMode ? 'Tạo album thành công' : 'Cập nhật album thành công',
      })

      handleClose()
    } catch (error: any) {
      addToast({
        color: 'danger',
        title: 'Thất bại',
        description: error?.message || 'Có lỗi xảy ra',
      })
    }
  }

  const hasExisting =
    !isCreateMode && (existingImagesState.length > 0 || existingVideosState.length > 0)

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
            <ModalHeader>{isCreateMode ? 'Tạo album mới' : 'Chỉnh sửa album'}</ModalHeader>

            <form onSubmit={handleSubmit(submit)}>
              <ModalBody className='max-h-[64vh] overflow-y-auto'>
                <div className='flex flex-col gap-6 pr-2'>
                  {/* COVER */}
                  <div className='space-y-3'>
                    <p className='text-ct-blue text-lg font-semibold'>Ảnh bìa</p>

                    <Controller
                      name='cover'
                      control={control}
                      render={({ field }) => (
                        <>
                          <input
                            ref={(el) => {
                              field.ref(el)
                              coverRef.current = el
                            }}
                            type='file'
                            accept='image/*'
                            className='hidden'
                            onBlur={field.onBlur}
                            onChange={(e) => {
                              field.onChange(e.target.files)
                              const f = e.target.files?.[0] ?? null
                              setCoverFile(f)
                            }}
                          />

                          <Button
                            type='button'
                            variant='bordered'
                            onPress={() => coverRef.current?.click()}
                            startContent={<Upload className='size-4' />}
                            className='w-full justify-center'
                          >
                            Chọn ảnh bìa
                          </Button>
                        </>
                      )}
                    />

                    <div className='rounded-xl border p-3'>
                      {coverPreview ? (
                        <div className='relative aspect-video overflow-hidden rounded-lg'>
                          <Image
                            src={coverPreview}
                            alt='cover-preview'
                            fill
                            className='object-cover'
                            unoptimized
                          />
                          <Button
                            isIconOnly
                            color='danger'
                            radius='full'
                            className='absolute right-2 top-2 size-7 min-w-0'
                            onPress={() => setCoverFile(null)}
                          >
                            <X className='size-4 text-white' />
                          </Button>
                        </div>
                      ) : albumEdit?.cover?.url ? (
                        <div className='relative aspect-video overflow-hidden rounded-lg'>
                          <Image
                            src={albumEdit.cover.url}
                            alt='cover-existing'
                            fill
                            className='object-cover'
                          />
                          <div className='absolute bottom-2 left-2 rounded-md bg-black/50 px-2 py-1 text-xs text-white'>
                            Ảnh bìa hiện có
                          </div>
                        </div>
                      ) : (
                        <div className='rounded-lg border border-dashed p-6 text-center text-sm text-foreground/50'>
                          Chưa có ảnh bìa.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 2 CỘT */}
                  <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                    {/* LEFT */}
                    <div className='space-y-4'>
                      <p className='text-ct-blue text-lg font-semibold'>Thông tin album</p>

                      <div className='flex flex-col gap-5'>
                        <CustomInput
                          label='Tên album'
                          placeholder='Nhập tên album'
                          {...register('title')}
                          validationErrorMessage={errors.title?.message}
                        />

                        <CustomTextArea
                          label='Mô tả'
                          placeholder='Nhập mô tả (tuỳ chọn)'
                          {...register('description')}
                        />

                        <Controller
                          name='status'
                          control={control}
                          render={({ field }) => (
                            <CustomSelect
                              label='Trạng thái'
                              placeholder='Chọn trạng thái'
                              selectedKeys={[field.value]}
                              onChange={(e) =>
                                field.onChange(e.target.value as 'draft' | 'published' | 'archived')
                              }
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
                    </div>

                    {/* RIGHT — ✅ Thêm scroll riêng */}
                    <div className='flex max-h-[60vh] flex-col space-y-4 overflow-y-auto pr-1'>
                      <p className='text-ct-blue flex-shrink-0 text-lg font-semibold'>
                        Ảnh/Video trong album
                      </p>

                      <Controller
                        name='files'
                        control={control}
                        render={({ field }) => (
                          <>
                            <input
                              ref={(el) => {
                                field.ref(el)
                                filesRef.current = el
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
                              onPress={() => filesRef.current?.click()}
                              startContent={<Upload className='size-4' />}
                              className='w-full flex-shrink-0 justify-center'
                            >
                              Chọn file (ảnh/video)
                            </Button>
                          </>
                        )}
                      />

                      {/* EXISTING */}
                      {hasExisting && (
                        <div className='space-y-2'>
                          <p className='text-xs font-medium text-default-500'>
                            File hiện có (khi chỉnh sửa)
                          </p>

                          <div className='grid grid-cols-3 gap-3'>
                            {existingImagesState.map((it, idx) => (
                              <LazyRemoteImageThumb
                                key={`old-img-${it.asset?.public_id}-${it.position}`}
                                src={it.asset.url}
                                alt={it.caption || 'existing'}
                                label='Ảnh hiện có'
                                onRemove={() => handleRemoveExisting('image', idx)}
                              />
                            ))}

                            {existingVideosState.map((v, idx) => (
                              <LazyRemoteVideoThumb
                                key={`old-video-${getVideoId(v.video, idx)}`}
                                src={getVideoUrl(v.video)}
                                label='Video hiện có'
                                onRemove={() => handleRemoveExisting('video', idx)}
                              />
                            ))}
                          </div>

                          {(removedImageIds.length > 0 || removedVideoIds.length > 0) && (
                            <div className='text-xs text-default-500'>
                              Đã chọn xoá: {removedImageIds.length} ảnh, {removedVideoIds.length}{' '}
                              video
                            </div>
                          )}
                        </div>
                      )}

                      {/* NEW FILES */}
                      <div className='space-y-2'>
                        <p className='text-xs font-medium text-default-500'>File mới sẽ upload</p>

                        <div className='grid grid-cols-3 gap-3'>
                          {newFiles.length === 0 ? (
                            <div className='col-span-full rounded-xl border border-dashed p-6 text-center text-sm text-foreground/50'>
                              Chưa có file mới.
                            </div>
                          ) : (
                            newFiles.map((file, index) => (
                              <LazyMediaThumb
                                key={`${file.name}-${file.lastModified}`}
                                file={file}
                                label='File mới'
                                onRemove={() => handleRemoveNewFile(index)}
                              />
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color='danger' variant='light' type='button' onPress={handleClose}>
                  Hủy
                </Button>
                <Button color='primary' type='submit'>
                  {isCreateMode ? 'Tạo album' : 'Lưu thay đổi'}
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
