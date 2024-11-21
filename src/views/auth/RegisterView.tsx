import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { UserRegistrationForm } from '@/types/index'
import ErrorMessage from '@/components/ErrorMessage'
import { createAccount } from '@/api/AuthAPI'
import { toast } from 'react-toastify'
import { Input } from '@factorialco/factorial-one/dist/experimental'
import { Button, Link } from '@factorialco/factorial-one'
import Notification from '@/components/shared/Notification'
import { useTranslation } from 'react-i18next'

export default function RegisterView() {
  
  const { t } = useTranslation()
  const initialValues: UserRegistrationForm = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: ''
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      toast(<Notification variant="destructive" title={error.message} />)
    },
    onSuccess: (data) => {
      toast(<Notification variant="positive" title={data} />)
      reset()
    }
  })

  const password = watch('password')

  const handleRegister = (formData: UserRegistrationForm) => mutate(formData)

  return (
    <>
      <h1 className="text-2xl text-f1-background-bold">
        {t('create_account')}
      </h1>

      <form
        className="space-y-2"
        noValidate
      >
        <div className="space-y-2">
          <Input
            placeholder={t('email.label')}
            type="email"
            {...register("email", {
              required: t('field.required'),
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: t('email.invalid'),
              }
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <div className="space-y-2">
          <Input
            placeholder={t('name')}
            type="text"
            {...register("name", {
              required: t('field.required')
            })}
          />
          {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          )}
        </div>

        <div className="space-y-2">
          <Input
            placeholder={t('lastname')}
            type="text"
            {...register("lastname", {
              required: t('field.required')
            })}
          />
          {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          )}
        </div>

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

          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
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

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <div className='AuthButton'>
          <Button
            label={t('register')}
            variant="default"
            size="lg"
            onClick={(e) => {e.preventDefault(); handleSubmit(handleRegister)()}}
          />
        </div>
      </form>

      <nav className="space-y-2 text-center">
        <div>
          {t('have_account')} <Link href={'/auth/login'}>{t('login')}</Link>
        </div>
        <div>
          {t('forgot_password')} <Link href='/auth/forgot-password'>{t('reset')}</Link>
        </div>
      </nav>
    </>
  )
}
