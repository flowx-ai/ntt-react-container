import { AuthProvider, AuthProviderProps } from 'oidc-react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { environment } from './environment'
import { environment as prodEnvironment } from './environment.prod'

import ProcessPage from './pages/process'
import LandingPage from './pages/landing'
import KitchenSinkPage from './pages/kitchensink'
import { Header } from './components/Header/Header'

const { keycloak } = import.meta.env.DEV ? environment : prodEnvironment

const oidcConfig: AuthProviderProps = {
  onBeforeSignIn: () => {
    localStorage.setItem('redirect', window.location.href)
    return ''
  },
  onSignIn: () => {
    // remove auth query params
    history.replaceState({}, document.title, window.location.pathname)
    const redirect = localStorage.getItem('redirect')
    window.location.href = redirect || '/'
    localStorage.removeItem('redirect')
  },
  authority: keycloak.issuer,
  clientId: keycloak.clientId,
  redirectUri: keycloak.redirectUri,
  responseType: keycloak.responseType,
  scope: keycloak.scope,
  automaticSilentRenew: false,
}
function App() {
  return (
    <AuthProvider {...oidcConfig}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/kitchen-sink" element={<KitchenSinkPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
