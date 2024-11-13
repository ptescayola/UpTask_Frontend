import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { RequestConfirmationCodeForm } from '@/types/index'
import ErrorMessage from '@/components/ErrorMessage'
import { requestConfirmationCode } from '@/api/AuthAPI'
import { toast } from 'react-toastify'
import Notification from '@/components/shared/Notification'
import { Input } from '@factorialco/factorial-one/dist/experimental'
import { Button, Link } from '@factorialco/factorial-one'

export default function RegisterView() {
  const initialValues: RequestConfirmationCodeForm = {
    email: ''
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: requestConfirmationCode,
    onError: (error) => {
      toast(<Notification variant="destructive" title={error.message} />)
    },
    onSuccess: (data) => {
      toast(<Notification variant="positive" title={data} />)
    }
  })

  const handleRequestCode = (formData: RequestConfirmationCodeForm) => mutate(formData)

  return (
      <>
        <h1 className="text-2xl text-f1-background-bold">Request new code confirmation</h1>

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
              label="Send code"
              variant="default"
              size="lg"
              onClick={(e) => {e.preventDefault(); handleSubmit(handleRequestCode)()}}
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
