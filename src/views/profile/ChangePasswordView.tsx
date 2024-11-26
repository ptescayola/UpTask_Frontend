import { useForm } from 'react-hook-form'
import { UpdateCurrentUserPasswordForm } from '@/types/index'
import { useMutation } from '@tanstack/react-query'
import { changePassword } from '@/api/ProfileAPI'
import { toast } from 'react-toastify'
import { Notification } from '@/components/shared'
import { useTranslation } from 'react-i18next'
import { Input, Button } from '@/components/shared'

export default function ChangePasswordView() {

  const { t } = useTranslation()
  const initialValues : UpdateCurrentUserPasswordForm = {
    current_password: '',
    password: '',
    password_confirmation: ''
  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
      mutationFn: changePassword,
      onError: (error) => toast(<Notification variant="danger" title={error.message} />),
      onSuccess: (data)  => toast(<Notification variant="positive" title={data} />)
  })

  const password = watch('password');
  const handleChangePassword = (formData : UpdateCurrentUserPasswordForm) => mutate(formData)

  return (
    <>
      <div className="space-y-2">

        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
          {t('change_password')}
        </h1>

        <form
          className="space-y-2"
          noValidate
        >
          <div className="space-y-2">
            <Input
              placeholder="Current password"
              type="password"
              {...register("current_password", {
                required: t('field.required')
              })}
              errors={errors.current_password}
            />
          </div>

          <div className="space-y-2">
            <Input
              placeholder={t('new_password')}
              type="password"
              {...register("password", {
                required: t('field.required'),
                minLength: {
                  value: 8,
                  message: t('password.too_short')
                }
              })}
              errors={errors.password}
            />
          </div>
          <div className="space-y-2">
            <Input
              placeholder={t('repeat_password')}
              type="password"
              {...register("password_confirmation", {
                required: t('field.required'),
                validate: value => value === password || t('password.not_match')
              })}
              errors={errors.password_confirmation}
            />
          </div>

          <Button
            label={t('update')}
            onClick={(e) => {e.preventDefault(); handleSubmit(handleChangePassword)()}}
          />
        </form>
      </div>
    </>
  )
}