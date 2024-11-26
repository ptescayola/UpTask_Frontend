import React from 'react'
import ErrorMessage from '@/components/ErrorMessage'
import { FieldError } from 'react-hook-form'
import clsx from 'clsx'

export type TextareaProps = {
  name: string
  label?: string
  placeholder?: string
  errors?: FieldError | undefined
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ name, label, placeholder, errors, ...rest }, ref) => {

  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700"> {label} </label>
      <textarea
        ref={ref}
        id={name}
        name={name}
        className={clsx(
          'w-full text-sm block relative mt-1 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm',
          errors
            ? 'border-red-200 focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600'
            : 'focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'
        )}
        rows={4}
        placeholder={placeholder}
        {...rest}
      ></textarea>
      {errors && (<ErrorMessage>{errors.message}</ErrorMessage>)}
    </>
  )
})
