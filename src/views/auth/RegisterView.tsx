import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { UserRegistrationForm } from '@/types/index'
import ErrorMessage from '@/components/ErrorMessage'
import { createAccount } from '@/api/AuthAPI'
import { toast } from 'react-toastify'
import { Input } from '@factorialco/factorial-one/dist/experimental'
import { Button, Link } from '@factorialco/factorial-one'
import Notification from '@/components/shared/Notification'

export default function RegisterView() {
  
  const initialValues: UserRegistrationForm = {
    name: '',
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
      <h1 className="text-2xl text-f1-background-bold">Create an account</h1>

      <form
        className="space-y-2"
        noValidate
      >
        <div className="space-y-2">
          <Input
            placeholder="Email"
            type="email"
            {...register("email", {
              required: "Required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email not valid",
              }
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <div className="space-y-2">
          <Input
            placeholder="Name"
            type="text"
            {...register("name", {
              required: "Required"
            })}
          />
          {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          )}
        </div>

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
            label="Register"
            variant="default"
            size="lg"
            onClick={(e) => {e.preventDefault(); handleSubmit(handleRegister)()}}
          />
        </div>
      </form>

      <nav className="space-y-2 text-center">
        <div>
          Do you already have an account? <Link href={'/auth/login'}>Log in</Link>
        </div>
        <div>
          Forgot your password? <Link href='/auth/forgot-password'>Reset</Link>
        </div>
      </nav>
    </>
  )
}
