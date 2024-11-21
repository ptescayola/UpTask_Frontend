import { Outlet, Navigate } from 'react-router-dom'
import { Page, StandardLayout } from '@factorialco/factorial-one/dist/experimental'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '@/hooks/useAuth'
import { Widget } from '@factorialco/factorial-one/dist/experimental'
import Header from '@/components/Header'
import { useTranslation } from 'react-i18next'

export default function AppLayout() {

  const { t } = useTranslation()
  const { data, isError, isLoading } = useAuth()
  if (isLoading) return <Widget.Skeleton />
  if (isError) return <Navigate to='/auth/login' />

  if (data) return (
    <div className="page-wrapper">
      <Page header={<Header user={data} />}>

        <StandardLayout>
          <Outlet />
        </StandardLayout>

        <ToastContainer
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          autoClose={3000}
          hideProgressBar={true}
          transition={Slide}
        />
      </Page>

      <footer className="flex justify-between py-5 px-4 text-f1-foreground-secondary">
        <p>{t('company.author')} · {t('company.email')}</p>
        <p>© {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}
