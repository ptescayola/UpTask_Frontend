import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { ForgotPasswordForm } from '@/types/index'
import { forgotPassword } from '@/api/AuthAPI'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { Notification, Input, Button } from '@/components/shared'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import AuthHeader from '@/components/auth/AuthHeader'
import AuthFooter from '@/components/auth/AuthFooter'

export default function ForgotPasswordView() {

  const { t } = useTranslation()
  const initialValues: ForgotPasswordForm = {
    email: ''
  }
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => {
      toast(<Notification variant="danger" title={error.message} />)
    },
    onSuccess: (data) => {
      toast(<Notification variant="positive" title={data} />)
      reset()
    }
  })
  
  const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData)

  return (
    <>
      <div className="w-full max-w-[320px]">

        <AuthHeader
          Icon={LockClosedIcon}
          title="Forgot password?"
          subtitle="No worries, we'll send you reset instructions."
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
            label="Reset password"
            className="w-full"
            onClick={handleSubmit(handleForgotPassword)}
          />
        </form>

        <AuthFooter />
      </div>
    </>
  )
}
