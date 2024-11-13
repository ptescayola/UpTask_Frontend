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

type NewPasswordFormProps = {
  token: ConfirmToken['token']
}

export default function NewPasswordForm({token}: NewPasswordFormProps) {
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
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "Required",
              minLength: {
                value: 8,
                message: 'The password must be at least 8 characters long'
              }
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="space-y-2">
          <Input
            placeholder="Repeat password"
            type="password"
            {...register("password_confirmation", {
              required: "Required",
              validate: value => value === password || 'Passwords are not match'
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <div className='AuthButton'>
          <Button
            label="Set password"
            variant="default"
            size="lg"
            onClick={(e) => {e.preventDefault(); handleSubmit(handleNewPassword)()}}
          />
        </div>
      </form>
    </>
  )
}
