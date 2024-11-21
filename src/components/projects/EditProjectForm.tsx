import ProjectForm from '@/components/projects/ProjectForm'
import { useNavigate } from 'react-router-dom'
import { Project, ProjectFormData } from '@/types/index'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProject } from '@/api/ProjectAPI'
import { toast } from 'react-toastify'
import { Button } from '@factorialco/factorial-one'
import Notification from '@/components/shared/Notification'
import { useTranslation } from 'react-i18next'

type EditProjectFormProps = {
  data: ProjectFormData
  projectId: Project['_id']
}

export default function EditProjectForm({data, projectId} : EditProjectFormProps) {

  const { t } = useTranslation()
  const navigate = useNavigate()
  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: {
    projectName: data.projectName,
    clientName: data.clientName,
    clientUrl: data.clientUrl,
    description: data.description
  }})
  
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast(<Notification variant="destructive" title={error.message} />)
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
    <div className="space-y-2">
      <div className='flex justify-between'>
        <div>
          <h1 className="text-2xl text-f1-background-bold">{t('edit_project')}</h1>
          <p className="text-lg text-f1-foreground-secondary">{t('edit_project_description')}</p>
        </div>
        <nav>
          <Button
            label={t('cancel')}
            onClick={() => navigate('/')}
            variant="neutral"
            size="lg"
          />
        </nav>
      </div>

      <form
        className="space-y-2"
        noValidate
      >
        <ProjectForm 
          register={register}
          errors={errors}
        />

        <Button
          label={t('update')}
          variant="default"
          size="lg"
          onClick={(e) => {e.preventDefault(); handleSubmit(handleForm)()}}
        />
      </form>
    </div>
  )
}
