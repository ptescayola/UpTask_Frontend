import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { CheckPasswordForm } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { checkPassword } from '@/api/AuthAPI'
import { deleteProject } from '@/api/ProjectAPI'
import { toast } from 'react-toastify'
import { Notification, Button, Input, Dialog } from '@/components/shared'
import { useTranslation } from 'react-i18next'
import { TrashIcon } from '@heroicons/react/24/outline'

export default function DeleteProjectModal() {
  const { t } = useTranslation()
  const initialValues: CheckPasswordForm = { password: '' }
  const location = useLocation()
  const navigate = useNavigate()

  const queryParams = new URLSearchParams(location.search)
  const deleteProjectId = queryParams.get('deleteProject')!
  const isOpen = deleteProjectId ? true : false

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const queryClient = useQueryClient()
  const checkUserPasswordMutation = useMutation({
    mutationFn: checkPassword,
    onError: (error) => toast(<Notification variant="danger" title={error.message} />)
  })

  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onError: (error) => toast(<Notification variant="danger" title={error.message} />),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      navigate(location.pathname, { replace: true })
    }
  })

  const handleForm = async (formData: CheckPasswordForm) => {
    await checkUserPasswordMutation.mutateAsync(formData)
    await deleteProjectMutation.mutateAsync(deleteProjectId)
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => navigate(location.pathname, { replace: true })}
      icon={<TrashIcon className="w-[24px] h-[24px] text-gray-600" />}
      title={t('delete_project')}
      subtitle={t('delete_project_description')}
      content={
        <Input
          type="password"
          {...register("password", { required: t('field.required') })}
          errors={errors.password}
        />
      }
      actions={
        <>
          <Button
            label={t('delete')}
            variant="danger"
            onClick={(e) => {
              e.preventDefault()
              handleSubmit(handleForm)()
            }}
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