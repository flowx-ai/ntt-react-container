import { AuthProvider, AuthProviderProps } from 'oidc-react'

import { environment } from './environment'
import { environment as prodEnvironment } from './environment.prod'

import Process from './process'

const { keycloak } = import.meta.env.DEV ? environment : prodEnvironment

const oidcConfig: AuthProviderProps = {
  onSignIn: () => {
    history.pushState({}, '', '/')
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
      <Process />
    </AuthProvider>
  )
}

export default App
