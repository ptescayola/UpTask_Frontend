import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { UserRegistrationForm } from '@/types/index'
import { createAccount } from '@/api/AuthAPI'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { Notification, Input, Button, EvaluatePassword } from '@/components/shared'
import { EyeIcon, EyeSlashIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'
import AuthHeader from '@/components/auth/AuthHeader'
import AuthFooter from '@/components/auth/AuthFooter'
import { useNavigate } from 'react-router-dom'
import { RoutesEnum } from '@/constants/routes'

export default function RegisterView() {
  
  const { t } = useTranslation()
  const navigate = useNavigate()

  const initialValues: UserRegistrationForm = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: ''
  }

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues })

  const password = watch('password')
  const [showPassword, setShowPassword] = useState<{ password: boolean; password_confirmation: boolean }>({
    password: false,
    password_confirmation: false,
  })
  const togglePasswordVisibility = (elem: 'password' | 'password_confirmation') => {
    setShowPassword((prev) => ({...prev, [elem]: !prev[elem]}))
  }

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      toast(<Notification variant="danger" title={error.message} />)
    },
    onSuccess: () => {
      navigate(RoutesEnum.CONFIRM_EMAIL)
      reset()
    }
  })

  const handleRegister = (formData: UserRegistrationForm) => mutate(formData)

  return (
    <>
      <div className='max-w-xl lg:max-w-3xl'>

        <AuthHeader
          Icon={RocketLaunchIcon}
          title="Welcome to Up Task"
          subtitle={t('create_account')}
        />

        <form className="mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <Input
              type="text"
              label={t('firstname')}
              {...register("name", {
                required: t('field.required')
              })}
              errors={errors.name}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Input
              type="text"
              label={t('lastname')}
              {...register("lastname", {
                required: t('field.required')
              })}
              errors={errors.lastname}
            />
          </div>

          <div className="col-span-6">
            <Input
              type="email"
              label={t('email.label')}
              {...register("email", {
                required: t('field.required'),
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: t('email.invalid')
                }
              })}
              errors={errors.email}
            />
          </div>
          
          <div className="col-span-6 sm:col-span-3">
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
          </div>

          <div className="col-span-6 sm:col-span-3">
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
          </div>

          <div className="col-span-6">
            <label htmlFor="MarketingAccept" className="flex gap-4">
              <input
                type="checkbox"
                id="MarketingAccept"
                name="marketing_accept"
                className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
              />

              <span className="text-sm text-gray-700">
                I want to receive emails about events, product updates and company announcements.
              </span>
            </label>
          </div>

          <div className="col-span-6">
            <p className="text-sm text-gray-500">
              By creating an account, you agree to our {' '}
              <a href="#" className="text-gray-700 underline">terms and conditions</a>
              {' '} and  {' '}
              <a href="#" className="text-gray-700 underline">privacy policy</a>.
            </p>
          </div>

          <div className="col-span-6">
            <Button
              label='Create an account'
              onClick={handleSubmit(handleRegister)}
              className="w-full"
            />
          </div>
        </form>

        <AuthFooter />

      </div>
    </>
  )
}
