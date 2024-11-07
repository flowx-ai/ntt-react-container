import { AuthProvider, AuthProviderProps } from 'oidc-react'

import { environment } from './environment'

import Process from './process'

const { keycloak } = environment

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
