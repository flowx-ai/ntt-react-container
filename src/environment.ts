// export const environment = {
//   baseUrl: '',
//   staticAssetsPath: '',

//   processApiPath: '/onboarding',
//   scanTimeout: 50000,

//   keycloak: {
//     // Url of the Identity Provider
//     issuer: '',

//     // URL of the SPA to redirect the user to after login
//     redirectUri: 'http://localhost:4200/',

//     // The SPA's id.
//     // The SPA is registerd with this id at the auth-serverß
//     clientId: '',

//     responseType: 'code',
//     // set the scope for the permissions the client should request
//     // The first three are defined by OIDC.
//     scope: 'openid profile email offline_access',
//     // Remove the requirement of using Https to simplify the demo
//     // THIS SHOULD NOT BE USED IN PRODUCTION
//     // USE A CERTIFICATE FOR YOUR IDP
//     // IN PRODUCTION
//     requireHttps: true,
//     // at_hash is not present in JWT token
//     showDebugInformation: true,
//     disableAtHashCheck: false,
//   },
// }

export const environment = {
  production: true,
  baseUrl: '${BASE_URL}',
  staticAssetsPath: '${STATIC_ASSETS_PATH}',

  processApiPath: '${PROCESS_API_PATH}',
  processName: '${PROCESS_NAME}',

  projectId: '${APP_ID}',
  themeId: '${THEME_ID}',
  locale: '${LOCALE}',
  language: '${LANGUAGE}',

  keycloak: {
    // Url of the Identity Provider
    issuer: '${KEYCLOAK_ISSUER}',

    // URL of the SPA to redirect the user to after login
    redirectUri: '${KEYCLOAK_REDIRECT_URI}',

    // The SPA's id.
    // The SPA is registerd with this id at the auth-serverß
    clientId: '${KEYCLOAK_CLIENT_ID}',

    responseType: 'code',
    // set the scope for the permissions the client should request
    // The first three are defined by OIDC.
    scope: '${KEYCLOAK_SCOPES}',
    // Remove the requirement of using Https to simplify the demo
    // THIS SHOULD NOT BE USED IN PRODUCTION
    // USE A CERTIFICATE FOR YOUR IDP
    // IN PRODUCTION
    requireHttps: true,
    // at_hash is not present in JWT token
    showDebugInformation: true,
    disableAtHashCheck: false,
  },
}
