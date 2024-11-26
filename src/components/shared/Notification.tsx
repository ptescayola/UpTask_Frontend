import React from 'react'
import clsx from 'clsx'

interface NotificationProps {
  variant: "danger" | "positive" | "warning" | "info"
  title?: string
  description?: string
}

export const Notification: React.FC<NotificationProps> = ({ variant, title, description }) => {

  return (
    <div role="alert" className={clsx(
      'rounded border-s-4 p-5',
      {
        'border-green-500 bg-green-50 text-green-800': variant === 'positive',
        'border-red-500 bg-red-50 text-red-800': variant === 'danger'
      })}>
      {title && (<strong className="block font-medium"> {title} </strong>)}

      {description && ( <p className="mt-2 text-sm">
        {description}
      </p>)}
    </div>
  )
}
