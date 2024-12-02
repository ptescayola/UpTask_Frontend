import clsx from 'clsx'

type ButtonProps = {
  label?: string
  variant?: 'neutral' | 'primary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  Icon?: React.ElementType
  className?: string
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void
}

export const Button = ({
  label,
  Icon,
  variant= 'primary',
  size = 'md',
  className,
  onClick
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center gap-2 justify-center shrink-0 rounded-md bg-blue-600 font-medium transition',
        {
          'bg-blue-600 hover:bg-blue-800 text-white': variant === 'primary',
          'bg-red-100 hover:bg-red-200 text-red-900': variant === 'danger',
          'bg-gray-100 hover:bg-gray-200 text-gray-900': variant === 'neutral'
        },
        {
          'px-4 py-2 text-xs': size === 'sm',
          'px-6 py-3 text-sm': size === 'md',
          'px-8 py-4 text-base': size === 'lg'
        },
        'focus:outline-none focus:ring',
        className
      )}
      onClick={onClick}
    >
      {Icon && (
        <Icon className={clsx(
          {
            'size-4': size === 'sm',
            'size-5': size === 'md',
            'size-6': size === 'lg'
          }
        )}  />
      )}
      {label}
    </button>
  )
}
