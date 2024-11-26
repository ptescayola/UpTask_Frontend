import { useDroppable } from '@dnd-kit/core'
import { useTranslation } from 'react-i18next'

type DropTaskProps = {
  status: string
}

export default function DropTask({status} : DropTaskProps) {

  const { t } = useTranslation()
  const { isOver, setNodeRef } = useDroppable({
    id: status
  })

  const style = {
    opacity: isOver ? 0.4 : undefined
  }

  return (
    <div
      style={style}
      ref={setNodeRef}
      className="flex place-content-center items-center justify-center rounded-md border-2 border-dashed border-f1-border bg-f1-background p-6"
    >
      <div className='mt-4 max-w-md text-gray-500'>
        {t('drop_here')}
      </div>
    </div>
  )
}
