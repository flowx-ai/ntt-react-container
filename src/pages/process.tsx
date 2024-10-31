import { useAuth } from 'oidc-react'

import { FlxProcessRenderer } from '@flowx/react-sdk'
import { useLocation } from 'react-router-dom'

import { environment } from '../environment'

import { MyCustomComponent } from '../components/MyCustomComponent/MyCustomComponent'

import { useLanguage } from '../hooks/useLanguage'

const { baseUrl, staticAssetsPath, processApiPath } = environment

export default function ProcessComponent() {
  const auth = useAuth()
  const location = useLocation()
  const { getSelectedLanguage } = useLanguage()

  return (
    auth.userData?.access_token && (
      <FlxProcessRenderer
        apiUrl={baseUrl}
        language={getSelectedLanguage().value}
        authToken={auth.userData?.access_token}
        processName={location.state?.processName?.label || location.state?.processName}
        processStartData={location.state?.processStartData}
        processApiPath={processApiPath}
        themeId={location?.state?.themeId}
        isDraft={false}
        components={{ MyCustomComponentIdentifier: MyCustomComponent }}
        staticAssetsPath={staticAssetsPath}
        locale="en-US"
        appInfo={{ appId: location.state?.appId }}
      />
    )
  )
}
