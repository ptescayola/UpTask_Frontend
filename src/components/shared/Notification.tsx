import React from 'react'
import { Alert, AlertTitle, AlertDescription } from '@factorialco/factorial-one/dist/experimental'

interface NotificationProps {
  variant: "destructive" | "positive" | "warning" | "info"
  title?: string
  description?: string
}

const CustomToast: React.FC<NotificationProps> = ({ variant, title, description }) => {
  return (
    <Alert variant={variant}>
      {title && (
        <AlertTitle>
          {title}
        </AlertTitle>
      )}
      {description && (
        <AlertDescription>
          {description}
        </AlertDescription>
      )}
    </Alert>
  )
}

export default CustomToast
