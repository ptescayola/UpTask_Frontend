type TabsProps = {
  options: {
    label: string
    name: string
    active: boolean
  }[]
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void
}

export const Tabs = ({options, onClick}: TabsProps) => {

  return (
    <>
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex" aria-label="Tabs">
          {options.map((option, index) => (
            <span
              key={index}
              data-name={option.name}
              onClick={onClick}
              className={`
                shrink-0 py-2 px-4 text-sm font-medium cursor-pointer
                ${option.active
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300'}
              `}
            >
              {option.label}
            </span>
          ))}
        </nav>
      </div>
  </>
  )
}
