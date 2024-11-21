import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import type { ConfirmToken, NewPasswordForm } from '@/types/index'
import ErrorMessage from '@/components/ErrorMessage'
import { updatePasswordWithToken } from '@/api/AuthAPI'
import { toast } from 'react-toastify'
import Notification from '@/components/shared/Notification'
import { Button } from '@factorialco/factorial-one'
import { Input } from '@factorialco/factorial-one/dist/experimental'
import { useTranslation } from 'react-i18next'

type NewPasswordFormProps = {
  token: ConfirmToken['token']
}

export default function NewPasswordForm({token}: NewPasswordFormProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const initialValues: NewPasswordForm = {
    password: '',
    password_confirmation: ''
  }
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: updatePasswordWithToken,
    onError: (error) => {
      toast(<Notification variant="destructive" title={error.message} />)
    },
    onSuccess: (data) => {
      toast(<Notification variant="positive" title={data} />)
      reset()
      navigate('/auth/login')
    }
  })

  const handleNewPassword = (formData: NewPasswordForm) => {
    const data = {
      formData,
      token
    }
    mutate(data)
  }

  const password = watch('password')

  return (
    <>
      <form
        className="space-y-2"
        noValidate
      >
        <div className="space-y-2">
        <Input
            placeholder={t('password.label')}
            type="password"
            {...register("password", {
              required: t('field.required'),
              minLength: {
                value: 8,
                message: t('password.too_short')
              }
            })}
          />
          {errors.password && (<ErrorMessage>{errors.password.message}</ErrorMessage>)}
        </div>

        <div className="space-y-2">
          <Input
            placeholder={t('repeat_password')}
            type="password"
            {...register("password_confirmation", {
              required: t('field.required'),
              validate: value => value === password || t('password.not_match')
            })}
          />

          {errors.password_confirmation && (<ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>)}
        </div>

        <div className='AuthButton'>
          <Button
            label={t('set_password')}
            variant="default"
            size="lg"
            onClick={(e) => {e.preventDefault(); handleSubmit(handleNewPassword)()}}
          />
        </div>
      </form>
    </>
  )
}
