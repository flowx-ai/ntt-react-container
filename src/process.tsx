import { useAuth } from 'oidc-react'
import { useEffect, useCallback } from 'react'

import { AnalyticsData } from '@flowx/core-sdk'
import { FlxProcessRenderer } from '@flowx/react-sdk'

import { environment } from './environment'

import { MyCustomComponent } from './components/MyCustomComponent/MyCustomComponent'

import { useLanguage } from './hooks/useLanguage'

const { baseUrl, staticAssetsPath, processApiPath } = environment

const processName = '<PROCESS_NAME>'
const projectId = '<PROJECT_ID>'
const themeId = '<THEME_ID>'
const processStartData = {}

export default function ProcessComponent() {
  const auth = useAuth()
  const { getSelectedLanguage } = useLanguage()

  const analyticsListener = useCallback((event: CustomEvent<AnalyticsData>) => {
    console.log('Received flowx:analytics event:', event.detail);
  }, [])

  useEffect(() => {
    document.addEventListener('flowx:analytics', analyticsListener)

    return () => {
      document.removeEventListener('flowx:analytics', analyticsListener)
    }
  }, [])

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
        projectInfo={{ projectId }}
      />
    )
  )
}
