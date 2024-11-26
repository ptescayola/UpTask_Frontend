import clsx from 'clsx'

type BadgeProps = {
  text: string
  variant?: 'gray' | 'purple' | 'orange'
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void
}

export const Badge = ({text, variant='gray', onClick}: BadgeProps) => {

  return (
    <span
      className={clsx(
        'whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm',
        {
          'bg-gray-100 text-gray-700': variant === 'gray',
          'bg-purple-100 text-purple-700': variant === 'purple',
          'bg-orange-100 text-orange-700': variant === 'orange'
        }
      )}
      onClick={onClick}
    >
      {text}
    </span>
  )
}
