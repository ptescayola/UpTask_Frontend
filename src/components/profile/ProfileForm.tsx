import { useForm } from 'react-hook-form'
import ErrorMessage from '@/components/ErrorMessage'
import { User, UserProfileForm } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProfile } from '@/api/ProfileAPI'
import { toast } from 'react-toastify'
import Notification from '@/components/shared/Notification'
import { Button } from '@factorialco/factorial-one'
import { Input } from '@factorialco/factorial-one/dist/experimental'
import { useTranslation } from 'react-i18next'

type ProfileFormProps = {
  data: User
}

export default function ProfileForm({ data }: ProfileFormProps) {
  const { t } = useTranslation()
  const { register, handleSubmit, formState: { errors } } = useForm<UserProfileForm>({ defaultValues: data })

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => toast(<Notification variant="destructive" title={error.message} />),
    onSuccess: (data) => {
      toast(<Notification variant="positive" title={data} />)
      queryClient.invalidateQueries({queryKey: ['user']})
    } 
  })

  const handleEditProfile = (formData: UserProfileForm) => mutate(formData)

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-2xl text-f1-background-bold">
          {t('profile')}
        </h1>

        <form
          className="space-y-2"
          noValidate
        >
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
            {errors.lastname && (
              <ErrorMessage>{errors.lastname.message}</ErrorMessage>
            )}
          </div>

          <div className="space-y-2">
            <Input
              placeholder={t('email.label')}
              type="email"
              {...register("email", {
                required: t('field.required'),
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: t('email.invalid')
                }
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>
          <Button
            label={t('update')}
            variant="default"
            size="lg"
            onClick={(e) => {e.preventDefault(); handleSubmit(handleEditProfile)()}}
          />
        </form>
      </div>
    </>
  )
}