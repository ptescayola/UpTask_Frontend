import { createContext, useState, ReactNode } from 'react'

type Breadcrumb = {
  label: string
  onClick?: () => void
}

interface BreadcrumbContextType {
  breadcrumbs: Breadcrumb[]
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void
}

export const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(null!)

export const BreadcrumbProvider = ({ children }: { children: ReactNode }) => {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([])

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      {children}
    </BreadcrumbContext.Provider>
  )
}
