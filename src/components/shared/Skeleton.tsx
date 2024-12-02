import clsx from 'clsx'

type SkeletonProps = {
  className?: string
  variant?: 'title' | 'text' | 'avatar' | 'button' | 'badge' | 'card'
}

export const Skeleton = ({ className, variant = 'text' }: SkeletonProps) => {
  return (
    <div
      className={clsx(
        'animate-pulse bg-gray-200 rounded',
        {
          'h-7 w-48': variant === 'title',
          'h-4 w-full': variant === 'text',
          'h-10 w-10 rounded-full': variant === 'avatar',
          'h-10 w-24': variant === 'button',
          'h-5 w-20 rounded-full': variant === 'badge',
          'h-[180px] w-full rounded-xl': variant === 'card'
        },
        className
      )}
    />
  )
}

export const ProjectCardSkeleton = () => {
  return (
    <div className="bg-white p-4 rounded-xl border border-stone-100">
      <div className="flex justify-between items-center gap-3">
        <Skeleton variant="badge" />
        <div className="flex gap-1">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
      <Skeleton variant="title" className="my-3" />
      <Skeleton variant="text" className="mt-2 w-3/4" />
      <Skeleton variant="text" className="mt-2 w-1/2" />
      <Skeleton variant="badge" className="mt-4" />
    </div>
  )
}

export const ProfileSkeleton = () => {
  return (
    <div className="space-y-6">
      <Skeleton variant="title" />
      <div className="mt-2 flex items-center gap-x-3">
        <Skeleton variant="avatar" />
        <Skeleton variant="button" />
      </div>
      <div className="space-y-4">
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </div>
      <Skeleton variant="button" className="mt-4" />
    </div>
  )
}

export const ProjectDetailsSkeleton = () => {
  return (
    <>
      <div className="flex justify-between mb-6">
        <div className="space-y-2">
          <Skeleton variant="title" />
          <Skeleton variant="text" className="w-64" />
        </div>
        <div className="flex gap-2">
          <Skeleton variant="button" />
          <Skeleton variant="button" />
        </div>
      </div>
      <div className="flex space-x-2 overflow-x-auto">
        {[1, 2, 3].map((column) => (
          <div key={column} className="flex-1 min-w-[250px] space-y-2">
            <div className="flex items-center space-x-2 p-2">
              <div className="w-2 h-2 rounded-full bg-gray-200" />
              <Skeleton variant="text" className="w-20" />
              <Skeleton variant="badge" className="w-8" />
            </div>
            {[1, 2].map((card) => (
              <Skeleton key={card} variant="card" />
            ))}
          </div>
        ))}
      </div>
    </>
  )
}