import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BreadcrumbProvider } from '@/contexts/BreadcrumbContext'
import './index.css'
import '@factorialco/factorial-one/dist/styles.css'
import Router from './router'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BreadcrumbProvider>
        <Router />
        {/* <ReactQueryDevtools /> */}
      </BreadcrumbProvider>
    </QueryClientProvider>
  </StrictMode>
)
