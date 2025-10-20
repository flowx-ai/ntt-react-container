export const environment = {
  baseUrl: 'https://admin.ntt-dev.az1.cloud.flowxai.dev',
  staticAssetsPath: 'https://minio-api.ntt-dev.az1.cloud.flowxai.dev/cms/medialibrary',

  processApiPath: '/onboarding',
  scanTimeout: 50000,

  keycloak: {
    // Url of the Identity Provider
    issuer: 'https://auth.ntt-dev.az1.cloud.flowxai.dev/auth/realms/flowx',

    // URL of the SPA to redirect the user to after login
    redirectUri: 'http://localhost:4200/',

    // The SPA's id.
    // The SPA is registerd with this id at the auth-serverß
    clientId: 'flowx-platform-authenticate',

    responseType: 'code',
    // set the scope for the permissions the client should request
    // The first three are defined by OIDC.
    scope: 'openid profile email offline_access',
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
