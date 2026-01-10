'use client'

import React from 'react'
import { extendVariants, Select, SelectItem, type SelectProps } from '@heroui/react'
import clsx from 'clsx'
import {
  type FieldError,
  type FieldErrorsImpl,
  type Merge,
  type UseFormRegisterReturn,
} from 'react-hook-form'

const BaseCustomSelect = extendVariants(Select, {
  defaultVariants: {
    size: 'md',
  },
})

type SelectItemElement = React.ReactElement<React.ComponentProps<typeof SelectItem>>

interface CustomSelectProps<T = string> extends Omit<
  SelectProps<T extends object ? T : object>,
  'children'
> {
  options?: {
    key: string | number
    value: string | number
    [key: string]: unknown
  }[]
  validationErrorMessage?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<Record<string, unknown>>>
    | undefined
  children?: SelectItemElement | SelectItemElement[]
  register?: UseFormRegisterReturn
}

const CustomSelect = <T extends string | number = string>({
  options,
  validationErrorMessage,
  children,
  labelPlacement = 'outside',
  register,
  disabledKeys,
  ...props
}: CustomSelectProps<T>) => {
  const { ref, ...restRegister } = register || {}

  return (
    <div className='flex flex-col'>
      <BaseCustomSelect
        {...(props as any)}
        {...restRegister}
        ref={ref as unknown as React.Ref<any>}
        labelPlacement={labelPlacement}
        disabledKeys={disabledKeys as Iterable<React.Key>}
        classNames={{
          trigger: clsx({
            'border-red-500 focus-within:ring-red-100 focus-within:border-red-500 bg-red-50':
              !!validationErrorMessage,
          }),
          ...(props.classNames as object),
        }}
        isRequired={undefined}
      >
        {children ??
          options?.map((option) => (
            <SelectItem key={option.key} textValue={String(option.value)}>
              {option.value}
            </SelectItem>
          ))}
      </BaseCustomSelect>

      <p
        className={[
          'mt-1 text-xs font-normal',
          validationErrorMessage ? 'text-danger' : 'select-none text-transparent',
        ].join(' ')}
      >
        {validationErrorMessage ? String(validationErrorMessage) : '.'}
      </p>
    </div>
  )
}

export default CustomSelect
