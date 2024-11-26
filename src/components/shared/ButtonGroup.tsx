import React from 'react'
import clsx from 'clsx'

type ButtonGroupProps = {
  items: {
    Icon: React.ElementType
    onClick: (e: React.MouseEvent) => void
  }[]
  size?: 'sm' | 'base' | 'lg'
  onMouseEnter?: React.MouseEventHandler<HTMLElement> 
  onMouseLeave?: React.MouseEventHandler<HTMLElement>
}

export const ButtonGroup = ({items, size='base', onMouseEnter, onMouseLeave}: ButtonGroupProps) => {
  return (
    <span
      className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {items.map((item, index) => (
        <button
          key={index}
          className={clsx(
            'inline-block border-e text-gray-700 hover:bg-gray-50 focus:relative',
            {
              'p-1': size === 'sm',
              'p-3': size === 'base',
              'p-4': size === 'lg'
            }
          )}
          onClick={item.onClick}
        >
          {item.Icon && (<item.Icon className="size-4" />)}
        </button>
      ))}
    </span>
  )
}
