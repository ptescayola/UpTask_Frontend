import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { UserLoginForm } from '@/types/index'
import { authenticateUser } from '@/api/AuthAPI'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { Notification, Button, Input } from '@/components/shared'
import { EyeIcon, EyeSlashIcon, FingerPrintIcon } from '@heroicons/react/24/outline'
import AuthHeader from '@/components/auth/AuthHeader'
import AuthFooter from '@/components/auth/AuthFooter'

export default function LoginView() {

  const { t } = useTranslation()
  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast(<Notification variant="danger" title={error.message} />)
    },
    onSuccess: () => {
      navigate('/')
    }
  })

  const handleLogin = (formData: UserLoginForm) => mutate(formData)

  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev)

  return (
    <>
      <div className="w-full max-w-[320px]">

        <AuthHeader
          Icon={FingerPrintIcon}
          title={t('login')}
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

          <br />

          <Input
            type={showPassword ? "text" : "password"}
            label={t('password.label')}
            RightIcon={!showPassword  ? EyeIcon : EyeSlashIcon}
            onRightIconClick={() => togglePasswordVisibility()}
            {...register("password", {
              required: t('field.required')
            })}
            errors={errors.password}
          />

          <div className='text-right text-sm mt-2'>
            <a onClick={() => navigate('/auth/forgot-password')}>
              {t('forgot_password')}
            </a>
          </div>

          <br />
          
          <Button
            label={t('sign_in')}
            className="w-full"
            onClick={handleSubmit(handleLogin)}
          />

          <AuthFooter />
        </form>
      </div>
    </>
  )
}