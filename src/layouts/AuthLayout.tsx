import Logo from '@/components/Logo'
import { Outlet } from 'react-router-dom'
import { ToastContainer, Slide } from 'react-toastify'
import { Page, StandardLayout } from '@factorialco/factorial-one/dist/experimental'

export default function AuthLayout() {
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

        <footer className="flex flex-row-reverse justify-between py-5 px-4 text-f1-foreground-secondary">
          <p>Pere Torres · ptescayola@gmail.com</p>
          <p>© {new Date().getFullYear()}</p>
        </footer>
      </div>
    </>
  )
}
