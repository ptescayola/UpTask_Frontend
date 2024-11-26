import { useEffect } from 'react'
import { validateToken } from '@/api/AuthAPI'
import { useSearchParams } from 'react-router-dom'
import NewPasswordForm from '@/components/auth/NewPasswordForm'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Notification } from '@/components/shared'
import { ConfirmToken } from '@/types/index'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import AuthHeader from '@/components/auth/AuthHeader'
import AuthFooter from '@/components/auth/AuthFooter'

export default function NewPasswordView() {

  const [searchParams] = useSearchParams()

  const token = searchParams.get('token') as ConfirmToken['token']

  const { mutate } = useMutation({
    mutationFn: validateToken,
    onError: (error) => {
      toast(<Notification variant="danger" title={error.message} />)
    }
  })

  useEffect(() => {
    if (token) {
      mutate({token})
    }
  }, [])

  return (
    <>
      <div className="w-full max-w-[320px]">
        <AuthHeader
          Icon={LockClosedIcon}
          title="Set new password"
          subtitle="Must be at least 8 characters."
        />

        <NewPasswordForm token={token} />

        <AuthFooter />
      </div>
    </>
  )
}
