type AvatarProps = {
  firstName: string
  lastName: string
  image?: string | null
  size?: 'sm' | 'md' | 'lg'
}

export const Avatar = ({firstName, lastName, image, size = 'md'}: AvatarProps) => {
  const initials = `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase()
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }

  return (
    <div
      className={`overflow-hidden rounded-full border border-gray-300 bg-white text-blue-500 shadow-inner ${sizeClasses[size]}`}
    >
      {image ? (
        <img 
          src={`${import.meta.env.VITE_SERVER_URL}/uploads/profiles/${image}`}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-sm font-medium flex items-center justify-center w-full h-full">
          {initials}
        </span>
      )}
    </div>
  )
}