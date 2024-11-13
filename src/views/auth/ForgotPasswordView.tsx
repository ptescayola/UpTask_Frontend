import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { ForgotPasswordForm } from '@/types/index'
import ErrorMessage from '@/components/ErrorMessage'
import { forgotPassword } from '@/api/AuthAPI'
import { toast } from 'react-toastify'
import Notification from '@/components/shared/Notification'
import { Button, Link } from '@factorialco/factorial-one'
import { Input } from '@factorialco/factorial-one/dist/experimental'

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = {
    email: ''
  }
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => {
      toast(<Notification variant="destructive" title={error.message} />)
    },
    onSuccess: (data) => {
      toast(<Notification variant="positive" title={data} />)
      reset()
    }
  })
  
  const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData)

  return (
    <>
      <h1 className="text-2xl text-f1-background-bold">Reset password</h1>

      <form
        className="space-y-2"
        noValidate
      >
        <div className="space-y-2">
          <Input
            placeholder="email"
            type="email"
            {...register("email", {
              required: "Required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email not valid"
              }
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <div className='AuthButton'>
          <Button
            label="Request new password"
            variant="default"
            size="lg"
            onClick={(e) => {e.preventDefault(); handleSubmit(handleForgotPassword)()}}
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
