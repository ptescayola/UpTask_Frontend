import { useState } from 'react'
import { PinInput, PinInputField } from '@chakra-ui/pin-input'
import { useMutation } from '@tanstack/react-query'
import { ConfirmToken } from '@/types/index'
import { confirmAccount } from '@/api/AuthAPI'
import { toast } from 'react-toastify'
import { Notification } from '@/components/shared'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import AuthHeader from '@/components/auth/AuthHeader'
import AuthFooter from '@/components/auth/AuthFooter'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'
import { RoutesEnum } from '@/constants/routes'

export default function ConfirmAccountView() {

  const { t } = useTranslation()
  const navigate = useNavigate()
  const [token, setToken] = useState<ConfirmToken['token']>('')

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      toast(<Notification variant="danger" title={error.message} />)
    },
    onSuccess: (data) => {
      toast(<Notification variant="positive" title={data} />)
      navigate(RoutesEnum.LOGIN)
    }
  })

  const handleChange = (token: ConfirmToken['token']) => setToken(token)
  const handleComplete = (token: ConfirmToken['token']) => mutate({token})

  return (
    <>
      <div className="w-full max-w-[320px]">

        <AuthHeader
          Icon={ShieldCheckIcon}
          title={t('confirm_account')}
          subtitle="[To define]"
        />

        <form className="mx-auto mb-8 mt-4">
          <div className="text-center text-sm text-gray-500 mb-4">
            {t('6_digit_code')}
          </div>
          <div className="flex justify-center gap-2">
            <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
              <PinInputField className="w-12 h-16 p-2 rounded-sm border border-solid text-center" />
              <PinInputField className="w-12 h-16 p-1 rounded-sm border border-solid text-center" />
              <PinInputField className="w-12 h-16 p-1 rounded-sm border border-solid text-center" />
              <PinInputField className="w-12 h-16 p-1 rounded-sm border border-solid text-center" />
              <PinInputField className="w-12 h-16 p-1 rounded-sm border border-solid text-center" />
              <PinInputField className="w-12 h-16 p-1 rounded-sm border border-solid text-center" />
            </PinInput>
          </div>
        </form>

        <AuthFooter />
      </div>
    </>
  )
}