import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { Project, TaskProject, TaskStatus } from '@/types/index'
import TaskCard from '@/components/tasks/TaskCard'
import { statusTranslations } from '@/locales/en'
import DropTask from '@/components/tasks/DropTask'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateStatus } from '@/api/TaskAPI'
import { toast } from 'react-toastify'
import Notification from '@/components/shared/Notification'
import { useParams } from 'react-router-dom'
import { RawTag } from '@factorialco/factorial-one/dist/experimental'

type TaskListProps = {
  tasks: TaskProject[]
  canEdit: boolean
}

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

const statusStyles: { [key: string]: string } = {
  pending: 'f1-icon',
  onHold: 'f1-icon-critical',
  inProgress: 'f1-icon-info',
  underReview: 'f1-icon-warning',
  completed: 'f1-icon-positive'
}

export default function TaskList({ tasks, canEdit }: TaskListProps) {

  const params = useParams()
  const projectId = params.projectId!
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast(<Notification variant="destructive" title={error.message} />)
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
    <div className='flex space-x-4 gap-4'>
      <DndContext onDragEnd={handleDragEnd} >
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="flex-1" style={{ minWidth: '200px' }}>
            <div className='space-y-4'>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 bg-${statusStyles[status]} rounded-full`}></div>
                <h1 className="text-lg font-bold">{statusTranslations[status]}</h1>
                <RawTag text={tasks.length.toString()} />
              </div>
              {tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit}/>)}
              <DropTask status={status} />
            </div>
          </div>
        ))}
      </DndContext>
    </div>
  )
}
