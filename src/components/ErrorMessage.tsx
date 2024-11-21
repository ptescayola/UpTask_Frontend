export default function ErrorMessage({children} : {children: React.ReactNode}) {
  return (
    <div className="text-sm font-medium text-f1-foreground-critical">
      {children}
    </div>
  )
}
