type CardProps = {
  title?: string
  header?: React.ReactNode
  content: React.ReactNode
  actions?: React.ReactNode
  onClick?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void | Promise<unknown>
}

export const Card = ({title, header, content, actions, onClick}: CardProps) => {
  return (
    
    <div
      className="bg-white p-4 relative border rounded-xl border-stone-100 hover:shadow-md duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-3 gap-3">
        {header}
        {actions}
      </div>
      <h3 className="text-lg font-medium sm:text-xl mb-3">{title}</h3>
      {content && (<div className="mt-1 text-sm text-gray-700">{content}</div>)}
    </div>
  )
}
