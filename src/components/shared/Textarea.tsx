import React from 'react'
import ErrorMessage from '@/components/ErrorMessage'
import { FieldError } from 'react-hook-form'
import clsx from 'clsx'

export type TextareaProps = {
  name: string
  label?: string
  placeholder?: string
  errors?: FieldError | undefined
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ name, label, placeholder, errors, onFocus, onBlur, ...rest }, ref) => {

  return (
    <>
      {label && (<label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1"> {label} </label>)}
      <textarea
        ref={ref}
        id={name}
        name={name}
        className={clsx(
          'w-full text-sm block relative overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm',
          errors
            ? 'border-red-200 focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600'
            : 'focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'
        )}
        rows={4}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        {...rest}
      ></textarea>
      {errors && (<ErrorMessage>{errors.message}</ErrorMessage>)}
    </>
  )
})
