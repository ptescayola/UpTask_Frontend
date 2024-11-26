import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Task, TaskFormData } from '@/types/index'
import { useForm } from 'react-hook-form'
import TaskForm from '@/components/tasks/TaskForm'
import { updateTask } from '@/api/TaskAPI'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { Notification, Dialog, Button } from '@/components/shared'
import { PencilIcon } from '@heroicons/react/24/outline'

type EditTaskModalProps = {
  data: Task
  taskId: Task['_id']
}

export default function EditTaskModal({data, taskId} : EditTaskModalProps) {

  const { t } = useTranslation()
  const navigate = useNavigate()

  const params = useParams()
  const projectId = params.projectId!

  const { register, handleSubmit, reset, formState: {errors} } = useForm<TaskFormData>({defaultValues: {
    name: data.name,
    description: data.description
  }})

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: updateTask,
    onError: (error) => {
      toast(<Notification variant="danger" title={error.message} />)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['project', projectId]})
      queryClient.invalidateQueries({queryKey: ['task', taskId]})
      toast(<Notification variant="positive" title={data} />)
      reset()
      navigate(location.pathname, {replace: true})
    }
  })

  const handleEditTask = (formData: TaskFormData) => {
    const data = { projectId, taskId, formData }
    mutate(data)
  }

  return (
    <Dialog
      isOpen={true}
      onClose={() => navigate(location.pathname, { replace: true })}
      icon={<PencilIcon className="w-[24px] h-[24px] text-gray-600" />}
      title={t('edit_task')}
      subtitle={t('edit_task_description')}
      content={
        <TaskForm
          register={register}
          errors={errors}
        />
      }
      actions={
        <>
          <Button
            label={t('update')}
            onClick={(e) => {e.preventDefault(); handleSubmit(handleEditTask)()}}
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
