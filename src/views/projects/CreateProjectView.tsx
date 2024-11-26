import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import ProjectForm from '@/components/projects/ProjectForm'
import { ProjectFormData } from '@/types/index'
import { createProject } from '@/api/ProjectAPI'
import { useBreadcrumb } from '@/hooks/useBreadcrumb'
import { Notification } from '@/components/shared'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/shared'

export default function CreateProjectView() {

  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setBreadcrumbs } = useBreadcrumb()

  const initialValues : ProjectFormData = {
    projectName: '',
    clientName: '',
    clientUrl: '',
    description: ''
  }

  useEffect(() => {
    setBreadcrumbs([
      { label: t('projects'), onClick: () => navigate('/')},
      { label: t('new_project')}
    ])
  }, [setBreadcrumbs])

  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

  const { mutate } = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast(<Notification variant="danger" title={error.message} />)
    },
    onSuccess: (data) => {
      toast(<Notification variant="positive" title={data} />)
      navigate('/')
    }
  })

  const handleForm = (formData : ProjectFormData) => mutate(formData)

  return (
    <>
      <div className='flex justify-between mb-6'>
        <div>
          <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
            {t('create_new_project')}
          </h1>
          <p className="mt-1 text-gray-500">
            {t('create_new_project_description')}
          </p>
        </div>
        <nav>
          <Button
            label={t('cancel')}
            variant='neutral'
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
          label={t('create')}
          onClick={(e) => {e.preventDefault(); handleSubmit(handleForm)()}}
        />
      </form>
    </>
  )
}
