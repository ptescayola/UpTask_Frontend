import { useDroppable } from '@dnd-kit/core'

type DropTaskProps = {
  status: string
}

export default function DropTask({status} : DropTaskProps) {
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
      <div className='text-lg text-f1-foreground-secondary'>
        Drop here
      </div>
    </div>
  )
}
