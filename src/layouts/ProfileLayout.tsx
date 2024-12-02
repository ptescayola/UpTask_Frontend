import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function ProfileLayout() {

  const { t } = useTranslation()
  const navigate = useNavigate()

  const tabs = [
    { label: t('profile'), path:'/profile', exact: true},
    { label: t('security'), path:'/profile/password', exact: false}
  ]

  const isActiveTab = (tabPath: string, exact: boolean) => {
    if (exact) return location.pathname === tabPath
    return location.pathname.startsWith(tabPath)
  }

  return (
    <>
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => navigate(tab.path)}
              className={`
                shrink-0 py-2 px-4 text-sm font-medium cursor-pointer
                ${isActiveTab(tab.path, tab.exact) 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300'}
              `}
            >
              {tab.label}
            </div>
          ))}
        </nav>
      </div>

      <Outlet />
  </>
  )
}