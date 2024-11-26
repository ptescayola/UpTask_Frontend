export default function ErrorMessage({children} : {children: React.ReactNode}) {
  return (
    <div className="text-sm text-red-500 mt-1">
      {children}
    </div>
  )
}
