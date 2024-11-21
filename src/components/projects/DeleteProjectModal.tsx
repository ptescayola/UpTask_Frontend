import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../ErrorMessage'
import { CheckPasswordForm } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { checkPassword } from '@/api/AuthAPI'
import { deleteProject } from '@/api/ProjectAPI'
import { Dialog, Input } from '@factorialco/factorial-one/dist/experimental'
import { Delete } from '@factorialco/factorial-one/icons/app'
import { toast } from 'react-toastify'
import { Button } from '@factorialco/factorial-one'
import Notification from '@/components/shared/Notification'
import { useTranslation } from 'react-i18next'

export default function DeleteProjectModal() {
  const { t } = useTranslation()
  const initialValues : CheckPasswordForm = {
    password: ''
  }
  const location = useLocation()
  const navigate = useNavigate()

  const queryParams = new URLSearchParams(location.search);
  const deleteProjectId = queryParams.get('deleteProject')!;
  const open = deleteProjectId ? true : false

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const queryClient = useQueryClient()
  const checkUserPasswordMutation = useMutation({
    mutationFn: checkPassword,
    onError: (error) => toast(<Notification variant="destructive" title={error.message} />)
  })

  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onError: (error) => {
      toast(<Notification variant="destructive" title={error.message} />)
    },
    onSuccess: (data) => {
      toast(<Notification variant="positive" title={data} />)
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
      open={open}
      header={{
        icon: Delete,
        title: t('delete_project'),
        description: t('delete_project_description')
      }}
      onClose={() => navigate(location.pathname, {replace: true}) }
    >
      <form
        className='space-y-2'
        noValidate
      >
        <Input
          placeholder={t('password.label')}
          type="password"
          {...register("password", {
            required: t('field.required'),
          })}
        />

        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}

        <Button
          label={t('delete')}
          variant="default"
          size="lg"
          onClick={(e) => {e.preventDefault(); handleSubmit(handleForm)()}}
        />
      </form>
    </Dialog> 
  )
}