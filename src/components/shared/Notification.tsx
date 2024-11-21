import React from 'react'
import { Alert, AlertTitle, AlertDescription } from '@factorialco/factorial-one/dist/experimental'
import { useTranslation } from 'react-i18next'

interface NotificationProps {
  variant: "destructive" | "positive" | "warning" | "info"
  title?: string
  description?: string
}

const CustomToast: React.FC<NotificationProps> = ({ variant, title, description }) => {

  const { t } = useTranslation()

  return (
    <Alert variant={variant}>
      {title && (
        <AlertTitle>
          {t(title)}
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
