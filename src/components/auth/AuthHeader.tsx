type AuthHeaderProps = {
  Icon: React.ElementType
  title: string
  subtitle?: string
}

export default function AuthHeader({title, subtitle, Icon}: AuthHeaderProps) {

  return (
    <>
      <div className="w-[54px] h-[54px] border border-gray-200 rounded-lg flex items-center justify-center mx-auto">
        <Icon className="w-[24px] h-[24px] text-blue-600" />
      </div>

      <h1 className="mt-6 text-center text-2xl font-semibold text-gray-700 sm:text-3xl md:text-4xl">
        {title}
      </h1>

      {subtitle && (<p className="text-center mt-2 mb-12 leading-relaxed text-gray-400">
        {subtitle}
      </p>
      )}
    </>
  )
}
