import { useState } from 'react'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useMutation } from '@tanstack/react-query'
import { ConfirmToken } from '@/types/index'
import { confirmAccount } from '@/api/AuthAPI'
import { toast } from 'react-toastify'
import Notification from '@/components/shared/Notification'
import { Link } from '@factorialco/factorial-one'

export default function ConfirmAccountView() {
  const [token, setToken] = useState<ConfirmToken['token']>('')

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      toast(<Notification variant="destructive" title={error.message} />)
    },
    onSuccess: (data) => {
      toast(<Notification variant="positive" title={data} />)
    }
  })

  const handleChange = (token: ConfirmToken['token']) => setToken(token)
  const handleComplete = (token: ConfirmToken['token']) => mutate({token})

  return (
    <>
      <h1 className="text-2xl text-f1-background-bold">Confirm your account</h1>

      <form className="space-y-2">
        <label className="text-sm font-medium text-center block">
          6 digit code
        </label>
        <div className="flex justify-center gap-2">
          <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
            <PinInputField className="w-8 h-8 p-1 rounded-sm border-f1-border border border-solid placeholder-f1-background text-center" />
            <PinInputField className="w-8 h-8 p-1 rounded-sm border-f1-border border border-solid placeholder-f1-background text-center" />
            <PinInputField className="w-8 h-8 p-1 rounded-sm border-f1-border border border-solid placeholder-f1-background text-center" />
            <PinInputField className="w-8 h-8 p-1 rounded-sm border-f1-border border border-solid placeholder-f1-background text-center" />
            <PinInputField className="w-8 h-8 p-1 rounded-sm border-f1-border border border-solid placeholder-f1-background text-center" />
            <PinInputField className="w-8 h-8 p-1 rounded-sm border-f1-border border border-solid placeholder-f1-background text-center" />
          </PinInput>
        </div>
      </form>

      <div className='text-center'>
        <Link href={'/auth/request-code'}>
          Request new code
        </Link>
      </div>
    </>
  )
}