import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { Project, TaskProject, TaskStatus } from '@/types/index'
import TaskCard from '@/components/tasks/TaskCard'
import { statusTranslations } from '@/locales/en'
import DropTask from '@/components/tasks/DropTask'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateStatus } from '@/api/TaskAPI'
import { toast } from 'react-toastify'
import { Notification, Badge } from '@/components/shared'
import { useParams } from 'react-router-dom'

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
  pending: 'bg-gray-300',
  onHold: 'bg-red-400',
  inProgress: 'bg-blue-400',
  underReview: 'bg-yellow-300',
  completed: 'bg-green-400'
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
    <div className='flex space-x-2 overflow-x-auto'>
      <DndContext onDragEnd={handleDragEnd} >
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="flex-1 min-w-[250px] bg-stone-100 p-1 space-y-2">
            <div className="flex items-center space-x-2 p-2">
              <div className={`w-2 h-2 ${statusStyles[status]} rounded-full`}></div>
              <h1 className="text-sm font-semibold uppercase text-gray-600">{statusTranslations[status]}</h1>
              <Badge text={tasks.length.toString()} variant="white"/>
            </div>
            {tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit}/>)}
            <DropTask status={status} />
          </div>
        ))}
        
      </DndContext>
    </div>
  )
}
