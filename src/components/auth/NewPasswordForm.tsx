import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import type { ConfirmToken, NewPasswordForm } from '@/types/index'
import { updatePasswordWithToken } from '@/api/AuthAPI'
import { toast } from 'react-toastify'
import { Notification, Input, Button, EvaluatePassword } from '@/components/shared'
import { useTranslation } from 'react-i18next'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { RoutesEnum } from '@/constants/routes'

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
      toast(<Notification variant="danger" title={error.message} />)
    },
    onSuccess: (data) => {
      toast(<Notification variant="positive" title={data} />)
      reset()
      navigate(RoutesEnum.LOGIN)
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

  const [showPassword, setShowPassword] = useState<{ password: boolean; password_confirmation: boolean }>({
    password: false,
    password_confirmation: false,
  })
  const togglePasswordVisibility = (elem: 'password' | 'password_confirmation') => {
    setShowPassword((prev) => ({...prev, [elem]: !prev[elem]}))
  }

  return (
    <>
      <form
        className="mx-auto mb-0 mt-8"
        noValidate
      >
        <Input
          type={showPassword.password ? "text" : "password"}
          label="Password"
          RightIcon={!showPassword.password  ? EyeIcon : EyeSlashIcon}
          onRightIconClick={() => togglePasswordVisibility('password')}
          {...register("password", {
            required: t('field.required'),
            minLength: {
              value: 8,
              message: t('password.too_short')
            }
          })}
          errors={errors.password}
        />

        <EvaluatePassword password={password} />

        <br/>

        <Input
          type={showPassword.password_confirmation ? "text" : "password"}
          RightIcon={!showPassword.password_confirmation  ? EyeIcon : EyeSlashIcon}
          onRightIconClick={() => togglePasswordVisibility('password_confirmation')}
          label="Password Confirmation"
          {...register("password_confirmation", {
            required: t('field.required'),
            validate: value => value === password || t('password.not_match')
          })}
          errors={errors.password_confirmation}
        />

        <br/>
  
        <Button
          label={t('reset_password')}
          className="w-full"
          onClick={handleSubmit(handleNewPassword)}
        />
      </form>
    </>
  )
}
