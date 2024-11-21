import { Outlet } from 'react-router-dom'
import { Tabs } from '@factorialco/factorial-one/dist/experimental'
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
      <Tabs
        tabs={tabs}
        secondary
      />
      <Outlet />
  </>
  )
}