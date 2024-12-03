import { useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { TaskProject } from '@/types/index'
import { statusTranslations } from '@/locales/en'
import TaskCard from '@/components/tasks/TaskCard'
import { Badge } from '@/components/shared'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'

type TaskColumnProps = {
  status: string
  tasks: TaskProject[]
  canEdit: boolean
}

export default function TaskColumn({ status, tasks, canEdit }: TaskColumnProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)
  const { isOver, setNodeRef } = useDroppable({
    id: status
  })

  const shouldShowButton = status === 'pending' || isHovered

  return (
    <div
      ref={setNodeRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={clsx(
        'flex-1 min-w-[250px] p-2 rounded-lg transition-colors',
        isOver ? 'bg-blue-50 ring-2 ring-blue-500 ring-inset' : 'bg-stone-100'
      )}
    >
      <div className="flex items-center space-x-2 p-2">
        <div className={clsx(
          'w-1 h-4 rounded-xl',
          {
            'bg-gray-300': status === 'pending',
            'bg-red-400': status === 'onHold',
            'bg-blue-400': status === 'inProgress',
            'bg-yellow-300': status === 'underReview',
            'bg-green-400': status === 'completed'
          }
        )} />
        <h1 className="text-sm font-semibold text-gray-600">
          {statusTranslations[status]}
        </h1>
        <Badge text={tasks.length.toString()} variant="white"/>
      </div>

      <div className="space-y-2">
        {tasks.map(task => (
          <TaskCard 
            key={task._id} 
            task={task} 
            canEdit={canEdit}
          />
        ))}
      </div>

      {canEdit && (
        <div className={clsx(
          'mt-2 px-2',
          !shouldShowButton && 'invisible'
        )}
        >
          <button
            onClick={() => navigate(location.pathname + `?newTask=true&status=${status}`)}
            className={clsx(
              'w-full group p-2 flex items-center justify-center gap-2',
              'text-sm text-gray-500 hover:text-gray-900',
              'rounded border-2 border-dashed border-gray-200 hover:border-gray-300',
              'transition-colors duration-200'
            )}
          >
            <PlusIcon className="w-4 h-4" />
            {t('add_task')}
          </button>
        </div>
      )}
    </div>
  )
}