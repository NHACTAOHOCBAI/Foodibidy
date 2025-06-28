import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import router from './router/router.tsx'
import MyProfileProvider from './context/MyProfileContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MyProfileProvider>
      <RouterProvider router={router} />
    </MyProfileProvider>
  </StrictMode>,
)
