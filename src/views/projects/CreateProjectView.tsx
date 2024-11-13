import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@factorialco/factorial-one'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import ProjectForm from '@/components/projects/ProjectForm'
import { ProjectFormData } from '@/types/index'
import { createProject } from '@/api/ProjectAPI'
import { useBreadcrumb } from '@/hooks/useBreadcrumb'
import Notification from '@/components/shared/Notification'

export default function CreateProjectView() {

  const navigate = useNavigate()
  const { setBreadcrumbs } = useBreadcrumb()

  const initialValues : ProjectFormData = {
    projectName: '',
    clientName: '',
    description: ''
  }

  useEffect(() => {
    setBreadcrumbs([
      { label: 'Projects', href: '/' },
      { label: 'New Project' }
    ])
  }, [setBreadcrumbs])

  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

  const { mutate } = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast(<Notification variant="destructive" title={error.message} />)
    },
    onSuccess: (data) => {
      toast(<Notification variant="positive" title={data} />)
      navigate('/')
    }
  })

  const handleForm = (formData : ProjectFormData) => mutate(formData)

  return (
    <div className="space-y-2">
      <div className='flex flex-row-reverse justify-between'>
        <div>
          <h1 className="text-2xl text-f1-background-bold">Create project</h1>
          <p className="text-lg text-f1-foreground-secondary">Please complete the form with all project details to proceed.</p>
        </div>
        <nav>
        <Button
          label="Cancel"
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
          label="Create new project"
          variant="default"
          size="lg"
          onClick={(e) => {e.preventDefault(); handleSubmit(handleForm)()}}
        />
      </form>
    </div>
  )
}
