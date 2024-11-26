import { Outlet, Navigate } from 'react-router-dom'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '@/hooks/useAuth'
import Header from '@/components/Header'
import { useTranslation } from 'react-i18next'

export default function AppLayout() {

  const { t } = useTranslation()
  const { data, isError, isLoading } = useAuth()
  if (isLoading) return (<p>Loading...</p>)
  if (isError) return <Navigate to='/auth/login' />

  if (data) return (
    <div className="page-wrapper">
      <Header user={data} />

      <div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-6 lg:px-8 bg-white'>
        <Outlet />
      </div>

      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        autoClose={3000}
        hideProgressBar={true}
        transition={Slide}
      />

      <footer className='mx-auto max-w-screen-xl pb-4'>
        <div className="text-xs text-gray-400 px-4 mt-6 border-t border-gray-100 pt-4 sm:flex sm:items-center sm:justify-between lg:mt-6">
          <p>{t('company.author')} · {t('company.email')}</p>
          <p>© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}
