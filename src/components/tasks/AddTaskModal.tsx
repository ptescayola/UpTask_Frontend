import { useLocation, useNavigate, useParams } from 'react-router-dom'
import TaskForm from '@/components/tasks/TaskForm'
import { useForm } from 'react-hook-form'
import { TaskFormData } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTask } from '@/api/TaskAPI'
import { toast } from 'react-toastify'
import { Notification, Button, Dialog } from '@/components/shared'
import { useTranslation } from 'react-i18next'
import { PencilIcon } from '@heroicons/react/24/outline'

export default function AddTaskModal() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const modalTask = queryParams.get('newTask')
  const isOpen = modalTask ? true : false

  const params = useParams()
  const projectId = params.projectId!

  const initialValues : TaskFormData = {
    name: '',
    description: ''
  }
  const { register, handleSubmit, reset, formState: {errors}  } = useForm({defaultValues: initialValues})

  const queryClient = useQueryClient() 
  const { mutate } = useMutation({
    mutationFn: createTask,
    onError: (error) => {
      console.log(error)
      toast(<Notification variant="danger" title={error.message} />)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['project', projectId]})
      toast(<Notification variant="positive" title={data} />)
      reset()
      navigate(location.pathname, {replace: true})
    }
  })

  const handleCreateTask = (formData: TaskFormData) => {
    const data = {
      formData,
      projectId
    }
    mutate(data)
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => navigate(location.pathname, { replace: true })}
      icon={<PencilIcon className="w-[24px] h-[24px] text-gray-600" />}
      title={t('new_task')}
      subtitle={t('new_task_description')}
      content={
        <TaskForm
          register={register}
          errors={errors}
        />
      }
      actions={
        <>
          <Button
            label={t('create_new_task')}
            onClick={(e) => {e.preventDefault(); handleSubmit(handleCreateTask)()}}
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
