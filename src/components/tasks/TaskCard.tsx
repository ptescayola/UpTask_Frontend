import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDraggable } from '@dnd-kit/core'
import { TaskProject, ExcludesNullish } from "@/types/index"
import { deleteTask } from '@/api/TaskAPI'
import { formatDate } from '@/utils/index'
import { Notification, Card, Badge, ButtonGroup } from '@/components/shared'
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

type TaskCardProps = {
  task: TaskProject
  canEdit: boolean
}

export default function TaskCard({ task, canEdit }: TaskCardProps) {

  const [isHovered, setisHovered] = useState(false)

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
    disabled: isHovered
  })

  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.projectId!

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onError: (error) => {
      toast(<Notification variant="danger" title={error.message} />)
    },
    onSuccess: (data) => {
      toast(<Notification variant="positive" title={data} />)
      queryClient.invalidateQueries({ queryKey: ['project', projectId] })
    }
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    rotate: '-3deg'
  } : undefined

  return (
    <>
      <div 
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
      >
        <Card
          header={<Badge text={formatDate(task.createdAt)} />}
          title={task.name}
          content={
            <>
              <p className='mt-2'>{task.description}</p>
            </>
          }
          actions={
            <ButtonGroup
              onMouseEnter={() => setisHovered(true)}
              onMouseLeave={() => setisHovered(false)}
              size="sm"
              items={[
                {
                  Icon: EyeIcon,
                  onClick: (e: React.MouseEvent) => {e.stopPropagation(); navigate(location.pathname + `?viewTask=${task._id}`)}
                },
                canEdit && {
                  Icon: PencilIcon,
                  onClick: (e: React.MouseEvent) => {e.stopPropagation(); navigate(location.pathname + `?editTask=${task._id}`)}
                },
                canEdit && {
                  Icon: TrashIcon,
                  onClick: (e: React.MouseEvent) => {e.stopPropagation(); mutate({ projectId, taskId: task._id })}
                }
              ].filter(Boolean as unknown as ExcludesNullish)}
            />
          }
        />
      </div>
    </>
  )
}
