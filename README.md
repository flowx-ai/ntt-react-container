# React Starter FlowX Container App

Starter template for React app with FlowX Renderer SDK.

## Prerequisites

- Node.js min version 18 - [Download Node.js](https://nodejs.org/en/blog/release/v18.12.0)
- React 18

## Getting Started

- Get npm registry auth details from FlowX (.npmrc)

Create a `.npmrc` file and update the placeholder tokens with the ones provided by FlowX.

```
//<AUTH_REPO>:_auth="<AUTH_TOKEN>"
email=<AUTH_EMAIL>
registry=https://<AUTH_REPO>
always-auth=true
strict-ssl=true
```

- Add environment endpoints

In `src/environments/environment.ts` file, update the `flowx` object with the values provided by FlowX.

```ts
export const environment = {
  ...
  baseUrl: '<BASE_URL>',
  staticAssetsPath: '<STATIC_ASSETS_PATH>',
  ...
  keycloak: {
    issuer: '<KEYCLOAK_URL>',
    ...
    clientId: '<KEYCLOAK_CLIENT>',
  }
};

```

- Add the FlowX Renderer SDK package versions in accordance with the FlowX platform version

In `package.json` file, update the FlowX package versions in accordance with the FlowX platform version.

```json
"dependencies": {
  ...
  "@flowx/react-sdk": "<version>",
  "@flowx/core-sdk": "<version>",
  "@flowx/react-theme": "<version>",
  "@flowx/core-theme": "<version>",
  "@flowx/react-ui-toolkit": "<version>",
  ...
}
```

## Running the app

- Install dependencies

```
npm install
```

- Start the Vite Development server:

```
npm run dev
```

- Change the name of the running process

In `src/pages/main/main.tsx` file, update the `startProcess` method parameter with the name, appId and optionally the theme id of the process to be run.

```html
<button onClick={() => startProcess('<PROCESS_NAME>', '<APP_ID>', <THEME_ID>)}>Start Demo Process</button>
```

### Prerequisites & Documentation

[Using the React Renderer](https://docs.flowx.ai/docs/platform-deep-dive/core-components/renderer-sdks/react-renderer)
