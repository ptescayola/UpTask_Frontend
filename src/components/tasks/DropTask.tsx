import { useDroppable } from '@dnd-kit/core'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'

type DropTaskProps = {
  status: string
}

export default function DropTask({status} : DropTaskProps) {

  const { t } = useTranslation()
  const { active, isOver, setNodeRef } = useDroppable({
    id: status
  })

  return (
    <div
      ref={setNodeRef}
      className={clsx(
        'flex place-content-center items-center justify-center p-6 opacity-0 border-2 border-dashed rounded-xl text-gray-400 bg-gray-50 h-[150px]',
        {
          'opacity-100': active,
          'text-blue-400 border-blue-500': isOver
        }
      )}
    >
      <div className='max-w-md'>
        {t('drop_here')}
      </div>
    </div>
  )
}
