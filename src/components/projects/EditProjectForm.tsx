import ProjectForm from '@/components/projects/ProjectForm'
import { useNavigate } from 'react-router-dom'
import { Project, ProjectFormData } from '@/types/index'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProject } from '@/api/ProjectAPI'
import { toast } from 'react-toastify'
import { Notification, Button } from '@/components/shared'
import { useTranslation } from 'react-i18next'

type EditProjectFormProps = {
  data: ProjectFormData
  projectId: Project['_id']
}

export default function EditProjectForm({data, projectId} : EditProjectFormProps) {

  const { t } = useTranslation()
  const navigate = useNavigate()
  const {register, handleSubmit, formState: {errors}} = useForm<ProjectFormData>({defaultValues: {
    projectName: data.projectName,
    clientName: data.clientName,
    clientUrl: data.clientUrl,
    description: data.description
  }})
  
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast(<Notification variant="danger" title={error.message} />)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['projects']})
      queryClient.invalidateQueries({queryKey: ['editProject', projectId]})
      toast(<Notification variant="positive" title={data} />)
      navigate('/')
    }
  })

  const handleForm = (formData: ProjectFormData) => {
    const data = {
      formData,
      projectId
    }
    mutate(data)
  }

  return (
    <>
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
            {t('edit_project')}
            </h1>
          <p className="mt-1 text-gray-500">
            {t('edit_project_description')}
          </p>
        </div>
        <nav>
          <Button
            label={t('cancel')}
            variant="neutral"
            onClick={() => navigate('/')}
          />
        </nav>
      </div>

      <form
        className="space-y-8"
        noValidate
      >
        <ProjectForm 
          register={register}
          errors={errors}
        />

        <Button
          label={t('update')}
          onClick={(e) => {e.preventDefault(); handleSubmit(handleForm)()}}
        />
      </form>
    </>
  )
}
