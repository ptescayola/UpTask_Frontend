import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useMutation } from '@tanstack/react-query'
import { ConfirmToken } from '@/types/index'
import { validateToken } from '@/api/AuthAPI'
import { toast } from 'react-toastify'
import Notification from '@/components/shared/Notification'
import { Link } from '@factorialco/factorial-one'

type NewPasswordTokenProps = {
  token: ConfirmToken['token']
  setToken: React.Dispatch<React.SetStateAction<string>>
  setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewPasswordToken({token, setToken, setIsValidToken}: NewPasswordTokenProps) {

  const { mutate } = useMutation({
    mutationFn: validateToken,
    onError: (error) => {
      toast(<Notification variant="destructive" title={error.message} />)
    },
    onSuccess: (data) => {
      toast(<Notification variant="positive" title={data} />)
      setIsValidToken(true)
    }
  })

  const handleChange = (token: ConfirmToken['token']) => setToken(token)
  const handleComplete = (token: ConfirmToken['token']) => mutate({token})

    return (
      <>
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
          <Link href={'/auth/forgot-password'}>
            Request new code
          </Link>
        </div>
      </>
    )
}