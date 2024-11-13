import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { UserLoginForm } from '@/types/index'
import ErrorMessage from '@/components/ErrorMessage'
import { authenticateUser } from '@/api/AuthAPI'
import { toast } from 'react-toastify'
import { Input } from '@factorialco/factorial-one/dist/experimental'
import { Button, Link } from '@factorialco/factorial-one'
import Notification from '@/components/shared/Notification'

export default function LoginView() {

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast(<Notification variant="destructive" title={error.message} />)
    },
    onSuccess: () => {
      navigate('/')
    }
  })

  const handleLogin = (formData: UserLoginForm) => mutate(formData)

  return (
    <>
      <h1 className="text-2xl text-f1-background-bold">Log in</h1>

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
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "Required"
            })}
          />

          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        
        <div className='text-right'>
          <Link href='/auth/forgot-password'>Forgot your password?</Link>
        </div>
        </div>
        
        <div className='AuthButton'>
          <Button
            label="Sign in"
            variant="default"
            size="lg"
            onClick={(e) => {e.preventDefault(); handleSubmit(handleLogin)()}}
          />
        </div>
      </form>
      
      <div className="text-center">
        You do not have an account? <Link href='/auth/register'>Get started now</Link>
      </div>
    </>
  )
}