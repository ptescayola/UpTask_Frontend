import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { Project, TaskProject, TaskStatus } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateStatus } from '@/api/TaskAPI'
import { toast } from 'react-toastify'
import { Notification } from '@/components/shared'
import { useParams } from 'react-router-dom'
import TaskColumn from './TaskColumn'

type GroupedTasks = {
  [key: string]: TaskProject[]
}

const initialStatusGroups: GroupedTasks = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: []
}

type TaskListProps = {
  tasks: TaskProject[]
  canEdit: boolean
}

export default function TaskList({ tasks, canEdit }: TaskListProps) {
  const params = useParams()
  const projectId = params.projectId!
  const queryClient = useQueryClient()
  
  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast(<Notification variant="danger" title={error.message} />)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] })
    }
  })

  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : []
    currentGroup = [...currentGroup, task]
    return { ...acc, [task.status]: currentGroup }
  }, initialStatusGroups)

  const handleDragEnd = (e: DragEndEvent) => {
    const { over, active } = e

    if (over && over.id) {
      const taskId = active.id.toString()
      const status = over.id as TaskStatus
      mutate({ projectId, taskId, status })

      queryClient.setQueryData(['project', projectId], (prevData: Project) => {
        const updatedTasks = prevData.tasks.map((task) => {
          if (task._id === taskId) {
            return {
              ...task,
              status
            }
          }
          return task
        })

        return {
          ...prevData,
          tasks: updatedTasks
        }
      })
    }
  }

  return (
    <div className='flex space-x-2 overflow-x-auto p-2'>
      <DndContext onDragEnd={handleDragEnd}>
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks}
            canEdit={canEdit}
          />
        ))}
      </DndContext>
    </div>
  )
}
