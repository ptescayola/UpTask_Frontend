import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { RequestConfirmationCodeForm } from '@/types/index'
import { requestConfirmationCode } from '@/api/AuthAPI'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { Notification, Button, Input } from '@/components/shared'
import AuthHeader from '@/components/auth/AuthHeader'
import { InboxArrowDownIcon } from '@heroicons/react/24/outline'
import AuthFooter from '@/components/auth/AuthFooter'

export default function RegisterView() {

  const { t } = useTranslation()
  const initialValues: RequestConfirmationCodeForm = {
    email: ''
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: requestConfirmationCode,
    onError: (error) => {
      toast(<Notification variant="danger" title={error.message} />)
    },
    onSuccess: (data) => {
      toast(<Notification variant="positive" title={data} />)
    }
  })

  const handleRequestCode = (formData: RequestConfirmationCodeForm) => mutate(formData)

  return (
      <>
        <div className="w-full max-w-[320px]">

          <AuthHeader
            Icon={InboxArrowDownIcon}
            title={t('request_new_code')}
          />

          <form
            className="mx-auto mb-0 mt-8"
            noValidate
          >
            <Input
              type="email"
              label={t('email.label')}
              {...register("email", {
                required: t('field.required'),
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: t('email.invalid'),
                }
              })}
              errors={errors.email}
            />

            <br/>

            <Button
              label={t('send_code')}
              className="w-full"
              onClick={handleSubmit(handleRequestCode)}
            />
          </form>

          <AuthFooter />

        </div>
      </>
  )
}
