import { useForm } from 'react-hook-form'
import { User, UserProfileForm } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProfile } from '@/api/ProfileAPI'
import { toast } from 'react-toastify'
import { Notification } from '@/components/shared'
import { Input, Button } from '@/components/shared'
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
    onError: (error) => toast(<Notification variant="danger" title={error.message} />),
    onSuccess: (data) => {
      toast(<Notification variant="positive" title={data} />)
      queryClient.invalidateQueries({queryKey: ['user']})
    } 
  })

  const handleEditProfile = (formData: UserProfileForm) => mutate(formData)

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
          {t('profile')}
        </h1>

        <form
          noValidate
        >
          <Input
            label={t('name')}
            placeholder={t('name')}
            type="text"
            {...register("name", {
              required: t('field.required')
            })}
            errors={errors.name}
          />

          <br/>

          <Input
            label={t('lastname')}
            placeholder={t('lastname')}
            type="text"
            {...register("lastname", {
              required: t('field.required')
            })}
            errors={errors.lastname}
          />

          <br/>

          <Input
            label={t('email.label')}
            placeholder={t('email.label')}
            type="email"
            {...register("email", {
              required: t('field.required'),
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: t('email.invalid')
              }
            })}
            errors={errors.email}
          />

          <br/>

          <Button
            label={t('update')}
            onClick={(e) => {e.preventDefault(); handleSubmit(handleEditProfile)()}}
          />
        </form>
      </div>
    </>
  )
}