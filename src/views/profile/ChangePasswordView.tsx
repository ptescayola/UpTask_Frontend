import { useForm } from 'react-hook-form'
import ErrorMessage from '@/components/ErrorMessage'
import { UpdateCurrentUserPasswordForm } from '@/types/index'
import { useMutation } from '@tanstack/react-query'
import { changePassword } from '@/api/ProfileAPI'
import { Button } from '@factorialco/factorial-one'
import { Input } from '@factorialco/factorial-one/dist/experimental'
import { toast } from 'react-toastify'
import Notification from '@/components/shared/Notification'

export default function ChangePasswordView() {
  const initialValues : UpdateCurrentUserPasswordForm = {
    current_password: '',
    password: '',
    password_confirmation: ''
  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
      mutationFn: changePassword,
      onError: (error) => toast(<Notification variant="destructive" title={error.message} />),
      onSuccess: (data)  => toast(<Notification variant="positive" title={data} />)
  })

  const password = watch('password');
  const handleChangePassword = (formData : UpdateCurrentUserPasswordForm) => mutate(formData)

  return (
    <>
      <div className="space-y-2">

        <h1 className="text-2xl text-f1-background-bold">Change Password</h1>

        <form
          className="space-y-2"
          noValidate
        >
          <div className="space-y-2">
            <Input
              placeholder="Current password"
              type="password"
              {...register("current_password", {
                required: "Required"
              })}
            />
            {errors.current_password && (
              <ErrorMessage>{errors.current_password.message}</ErrorMessage>
            )}
          </div>

          <div className="space-y-2">
            <Input
              placeholder="New password"
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

          <Button
            label="Update"
            variant="default"
            size="lg"
            onClick={(e) => {e.preventDefault(); handleSubmit(handleChangePassword)()}}
          />
        </form>
      </div>
    </>
  )
}