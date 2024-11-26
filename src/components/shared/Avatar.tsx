type AvatarProps = {
  firstName: string
  lastName: string
}

export const Avatar = ({firstName, lastName}: AvatarProps) => {

  const initials = `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase()

  return (
    <div
      className="overflow-hidden rounded-full border border-gray-300 bg-white text-blue-500 shadow-inner"
    >
      <span className="text-sm font-medium flex items-center justify-center w-full h-full p-2">
        {initials}
      </span>
    </div>
  )
}
