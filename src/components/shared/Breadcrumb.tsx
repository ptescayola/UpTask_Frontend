import { useBreadcrumb } from '@/hooks/useBreadcrumb'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

export const Breadcrumb = () => {

  const { breadcrumbs} = useBreadcrumb()

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 text-sm text-blue-500">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronRightIcon className='w-[12px] h-[12px]'/>
            )}
            {breadcrumb.onClick ? (
              <button
                onClick={breadcrumb.onClick}
                className="block transition hover:text-gray-700"
              >
                {breadcrumb.label}
              </button>
            ) : (
              <span className="block text-gray-500">{breadcrumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
