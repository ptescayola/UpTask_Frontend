import { Dialog } from '@factorialco/factorial-one/dist/experimental'
import { Pencil } from '@factorialco/factorial-one/icons/app'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Task, TaskFormData } from '@/types/index'
import { useForm } from 'react-hook-form'
import TaskForm from '@/components/tasks/TaskForm'
import { updateTask } from '@/api/TaskAPI'
import { toast } from 'react-toastify'
import Notification from '@/components/shared/Notification'
import { Button } from '@factorialco/factorial-one'

type EditTaskModalProps = {
  data: Task
  taskId: Task['_id']
}

export default function EditTaskModal({data, taskId} : EditTaskModalProps) {
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
      toast(<Notification variant="destructive" title={error.message} />)
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
      open={true}
      header={
        {
          icon: Pencil,
          title: 'Edit Task',
          description: 'Fill out the form and edit a task'
        }
      }
      onClose={() => navigate(location.pathname, {replace: true}) }
    >
      <form
        className='space-y-2'
        noValidate
      >
        <TaskForm 
            register={register}
            errors={errors}
        />

        <Button
          label="Update"
          variant="default"
          size="lg"
          onClick={(e) => {e.preventDefault(); handleSubmit(handleEditTask)()}}
        />
      </form>
    </Dialog>
  )
}
