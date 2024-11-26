import { Outlet } from 'react-router-dom'
import { ToastContainer, Slide } from 'react-toastify'

export default function AuthLayout() {

  return (
    <>
      <section className="bg-white lg:min-h-screen">
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <Outlet />
        </main>

        <ToastContainer
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          autoClose={3000}
          hideProgressBar={true}
          transition={Slide}
        />
      </section>
    </>
  )
}
