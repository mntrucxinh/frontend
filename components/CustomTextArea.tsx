import { forwardRef } from 'react'
import { cn, Textarea, type TextAreaProps } from '@heroui/react'
import {
  type FieldError,
  type FieldErrorsImpl,
  type Merge,
  type UseFormRegisterReturn,
} from 'react-hook-form'

interface CustomTextAreaProps extends Omit<TextAreaProps, 'children'> {
  validationErrorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl> | undefined
  register?: UseFormRegisterReturn
}

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
  return (instance: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(instance)
      } else if (ref != null) {
        const mutableRef = ref as React.MutableRefObject<T | null>
        mutableRef.current = instance
      }
    })
  }
}

const CustomTextArea = forwardRef<React.ElementRef<typeof Textarea>, CustomTextAreaProps>(
  (
    {
      validationErrorMessage,
      register,
      onChange,
      onBlur,
      value,
      labelPlacement = 'outside',
      type,
      endContent,
      ...props
    },
    ref
  ) => {
    const { ref: registerRef, ...restRegister } = register || {}

    const combinedRef = mergeRefs(ref, registerRef)

    const finalEndContent = endContent

    return (
      <Textarea
        ref={combinedRef}
        labelPlacement={labelPlacement}
        type={type}
        isInvalid={Boolean(validationErrorMessage)}
        errorMessage={validationErrorMessage ? String(validationErrorMessage) : undefined}
        classNames={{
          input: cn(validationErrorMessage && 'placeholder:text-danger'),
          ...props.classNames,
        }}
        endContent={finalEndContent}
        {...(register ? restRegister : { onChange, onBlur, value })}
        {...props}
      />
    )
  }
)
CustomTextArea.displayName = 'CustomTextArea'
export default CustomTextArea
