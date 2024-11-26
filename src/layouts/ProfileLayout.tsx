import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function ProfileLayout() {

  const { t } = useTranslation()
  const navigate = useNavigate()

  const tabs = [
    { label: t('profile'), onClick: () => navigate('/profile')},
    { label: t('security'), onClick: () => navigate('/profile/password') }
  ]

  return (
    <>
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex gap-6" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={tab.onClick}
              className="shrink-0 p-2 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300 cursor-pointer"
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