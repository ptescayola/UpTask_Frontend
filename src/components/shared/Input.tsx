import React from 'react'
import ErrorMessage from '@/components/ErrorMessage'
import { FieldError } from 'react-hook-form'
import clsx from 'clsx'

export type InputProps = {
  name: string
  type: "text" | "email" | "password"
  label?: string
  placeholder?: string
  errors?: FieldError | undefined
  RightIcon?: React.ElementType
  onRightIconClick?: () => void
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, type, label, placeholder, errors, RightIcon, onRightIconClick, ...rest }, ref) => {

  return (
    <>
       <label htmlFor={name} className="block text-sm font-medium text-gray-700"> {label} </label>
        <div
          className={clsx(
            'block relative mt-1 overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm',
            errors
              ? 'border-red-200 focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-600'
              : 'focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600'
          )}
        >
          <div className={clsx(RightIcon && 'grid grid-cols-[auto_min-content] gap-1')}>
            <input
              ref={ref}
              id={name}
              name={name}
              type={type}
              className="w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              placeholder={placeholder}
              {...rest}
            />

            {RightIcon && (
              <span
                className="cursor-pointer place-content-center text-gray-500"
                onClick={onRightIconClick}
              >
                <RightIcon className="h-5 w-5" />
            </span>
            )}

          </div>
          
        </div>
        {errors && (<ErrorMessage>{errors.message}</ErrorMessage>)}
    </>
  )
})
