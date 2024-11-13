import { Outlet } from 'react-router-dom'
import { Tabs } from '@factorialco/factorial-one/dist/experimental'
import { useNavigate } from 'react-router-dom'



export default function ProfileLayout() {

  const navigate = useNavigate()

  const tabs = [
    { label: 'Profile', onClick: () => navigate('/profile')},
    { label: 'Change Password', onClick: () => navigate('/profile/password') }
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