import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { TeamMemberForm } from '@/types/index'
import { findUserByEmail } from '@/api/TeamAPI'
import SearchResult from '@/components/team/SearchResult'
import { Input, Button } from '@/components/shared'
import { useTranslation } from 'react-i18next'

export default function AddMemberForm() {

    const { t } = useTranslation()
    const initialValues: TeamMemberForm = {
      email: ''
    }
    const params = useParams()
    const projectId = params.projectId!

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const mutation = useMutation({
      mutationFn: findUserByEmail
    })

    const handleSearchUser = async (formData: TeamMemberForm) => {
      const data = {projectId, formData}
      mutation.mutate(data)
    }

    const resetData = () => {
      reset()
      mutation.reset()
    }

    return (
      <>
        <form
          className="space-y-8"
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
                  message: t('email.invalid')
                }
              })}
              errors={errors.email}
            />
          </div>

          <Button
            label={t('find_user')}
            onClick={(e) => {e.preventDefault(); handleSubmit(handleSearchUser)()}}
          />
        </form>

        <div className="mt-10">
          {mutation.isPending && <p className="text-center">'Loading...'</p>}
          {mutation.error && <p className="text-center">{mutation.error.message}</p>}
          {mutation.data && <SearchResult user={mutation.data} reset={resetData} />}
        </div>
      </>
    )
}