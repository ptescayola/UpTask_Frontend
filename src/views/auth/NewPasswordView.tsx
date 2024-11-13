import NewPasswordToken from '@/components/auth/NewPasswordToken'
import NewPasswordForm from '@/components/auth/NewPasswordForm'
import { useState } from 'react'
import { ConfirmToken } from '@/types/index'

export default function NewPasswordView() {
  const [token, setToken] = useState<ConfirmToken['token']>('')
  const [isValidToken, setIsValidToken] = useState(false)

  return (
    <>
      <h1 className="text-2xl text-f1-background-bold">Reset Password</h1>

      {!isValidToken
        ? <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken}  />
        : <NewPasswordForm token={token} />
      }
    </>
  )
}
