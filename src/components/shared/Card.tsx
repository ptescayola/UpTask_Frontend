type CardProps = {
  title?: string
  statusTag?: React.ReactNode
  content: React.ReactNode
  actions?: React.ReactNode
  onClick?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void | Promise<unknown>
}

export const Card = ({title, statusTag, content, actions, onClick}: CardProps) => {
  return (
    
    <div
      className="flex-col items-stretch rounded-xl border bg-f1-background p-4 relative flex gap-2 border-f1-border hover:shadow-md duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-1 flex-row flex-nowrap items-start justify-between gap-2 ">
        <div className="flex min-h-6 grow flex-row items-center gap-1">
          <h3 className="text-lg font-medium sm:text-xl">{title}</h3>
          {statusTag}
        </div>
        <div className="flex flex-row items-center gap-3">{actions}</div>
      </div>
      {content && (
        <div className="mt-1 text-sm text-gray-700">{content}</div>
      )}
    </div>
  )
}
