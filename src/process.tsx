import { useAuth } from 'oidc-react'

import { FlxProcessRenderer } from '@flowx/react-sdk'

import { environment } from './environment'

import { MyCustomComponent } from './components/MyCustomComponent/MyCustomComponent'

import { useLanguage } from './hooks/useLanguage'

const { baseUrl, staticAssetsPath, processApiPath } = environment

const processName = '<PROCESS_NAME>'
const appId = '<APP_ID>'
const themeId = '<THEME_ID>'
const processStartData = {}

export default function ProcessComponent() {
  const auth = useAuth()
  const { getSelectedLanguage } = useLanguage()

  return (
    auth.userData?.access_token && (
      <FlxProcessRenderer
        apiUrl={baseUrl}
        language={getSelectedLanguage().value}
        authToken={auth.userData?.access_token}
        processName={processName}
        processStartData={processStartData}
        processApiPath={processApiPath}
        themeId={themeId}
        isDraft={false}
        components={{ MyCustomComponentIdentifier: MyCustomComponent }}
        staticAssetsPath={staticAssetsPath}
        locale="en-US"
        appInfo={{ appId }}
      />
    )
  )
}
