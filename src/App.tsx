import { environment } from './environment'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Main } from './pages/main/main'
import Process from './pages/process'
import { AuthProvider, AuthProviderProps } from 'oidc-react'

const { keycloak } = environment

const oidcConfig: AuthProviderProps = {
  onSignIn: () => {
    // remove auth query params
    history.pushState({}, '', '/')
  },
  authority: keycloak.issuer,
  clientId: keycloak.clientId,
  redirectUri: keycloak.redirectUri,
  responseType: keycloak.responseType,
  scope: keycloak.scope,
  automaticSilentRenew: false,
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/process',
    element: <Process />,
  },
])
function App() {
  return (
    <AuthProvider {...oidcConfig}>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
