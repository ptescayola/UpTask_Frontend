import Logo from '@/components/Logo'
import { Outlet } from 'react-router-dom'
import { ToastContainer, Slide } from 'react-toastify'
import { Page, StandardLayout } from '@factorialco/factorial-one/dist/experimental'
import { useTranslation } from 'react-i18next'

export default function AuthLayout() {

  const { t } = useTranslation()

  return (
    <>
    <div className="page-wrapper" style={{maxWidth: '390px'}}>
        <Page>
          <StandardLayout>
            <Logo />
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
    </>
  )
}
