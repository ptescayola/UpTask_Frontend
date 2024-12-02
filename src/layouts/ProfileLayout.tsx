import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Tabs } from '@/components/shared'

export default function ProfileLayout() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const tabs = [
    { 
      label: t('profile'), 
      name: 'profile', 
      active: location.pathname === '/profile'
    },
    { 
      label: t('security'), 
      name: 'password', 
      active: location.pathname.startsWith('/profile/password')
    }
  ]

  const handleTabClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const name = (e.currentTarget as HTMLElement).getAttribute('data-name')
    if (name === 'profile') navigate('/profile')
    if (name === 'password') navigate('/profile/password')
  }

  return (
    <>
      <Tabs 
        options={tabs}
        onClick={handleTabClick}
      />
      <Outlet />
    </>
  )
}