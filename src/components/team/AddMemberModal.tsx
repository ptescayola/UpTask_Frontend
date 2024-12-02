import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Dialog, Button, Input } from '@/components/shared'
import { UsersIcon } from '@heroicons/react/24/outline'
import { useForm } from 'react-hook-form'
import { TeamMemberForm } from '@/types/index'
import { findUserByEmail } from '@/api/TeamAPI'
import { useMutation } from '@tanstack/react-query'
import SearchResult from '@/components/team/SearchResult'

export default function AddMemberModal() {

  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  const queryParams = new URLSearchParams(location.search)
  const addMember = queryParams.get('addMember')
  const isOpen = addMember ? true : false

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
    <Dialog
      isOpen={isOpen}
      onClose={() => navigate(location.pathname, { replace: true })}
      icon={<UsersIcon className="w-[24px] h-[24px] text-gray-600" />}
      title={t('add_member')}
      subtitle={t('add_member_description')}
      content={
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
          </form>
          <div className="my-10">
            {mutation.isPending && <p className="text-center">'Loading...'</p>}
            {mutation.error && <p className="text-center text-gray-500">{t(mutation.error.message)}</p>}
            {mutation.data && <SearchResult user={mutation.data} reset={resetData} />}
          </div>
        </>
      }
      actions={
        <>
          <Button
            label={t('find_user')}
            onClick={(e) => {e.preventDefault(); handleSubmit(handleSearchUser)()}}
          />

          <Button
            label={t('cancel')}
            variant="neutral"
            onClick={(e) => {
              e.preventDefault()
              navigate(location.pathname, { replace: true })
            }}
          />
        </>
      }
    />
  )
}