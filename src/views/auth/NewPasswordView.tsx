import { useEffect } from 'react'
import { validateToken } from '@/api/AuthAPI'
import { useSearchParams } from 'react-router-dom'
import NewPasswordForm from '@/components/auth/NewPasswordForm'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import Notification from '@/components/shared/Notification'
import { ConfirmToken } from '@/types/index'
import { useTranslation } from 'react-i18next'

export default function NewPasswordView() {

  const { t } = useTranslation()
  const [searchParams] = useSearchParams()

  const token = searchParams.get('token') as ConfirmToken['token']

  const { mutate } = useMutation({
    mutationFn: validateToken,
    onError: (error) => {
      toast(<Notification variant="destructive" title={error.message} />)
    }
  })

  useEffect(() => {
    if (token) {
      mutate({token})
    }
  }, [])

  return (
    <>
      <h1 className="text-2xl text-f1-background-bold">
        {t('reset_password')}
      </h1>

      <NewPasswordForm token={token} />
    </>
  )
}
