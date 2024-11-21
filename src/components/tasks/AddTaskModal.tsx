import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Dialog } from '@factorialco/factorial-one/dist/experimental'
import { Pencil } from '@factorialco/factorial-one/icons/app'
import TaskForm from '@/components/tasks/TaskForm'
import { useForm } from 'react-hook-form'
import { TaskFormData } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTask } from '@/api/TaskAPI'
import { toast } from 'react-toastify'
import { Button } from '@factorialco/factorial-one'
import Notification from '@/components/shared/Notification'
import { useTranslation } from 'react-i18next'

export default function AddTaskModal() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const modalTask = queryParams.get('newTask')
  const open = modalTask ? true : false

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
      toast(<Notification variant="destructive" title={error.message} />)
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
    <>
      <Dialog
        open={open}
        header={{
          icon: Pencil,
          title: t('new_task'),
          description: t('new_task_description')
        }}
        onClose={() => navigate(location.pathname, {replace: true}) }
      >
        <form
          className='space-y-2'
          onSubmit={handleSubmit(handleCreateTask)}
          noValidate
        >
          <TaskForm 
            register={register}
            errors={errors}
          />

          <Button
            label={t('create_new_task')}
            variant="default"
            size="lg"
            onClick={(e) => {e.preventDefault(); handleSubmit(handleCreateTask)()}}
          />
        </form>
      </Dialog>
    </>
  )
}
