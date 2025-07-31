import { useAuth } from 'oidc-react'
import { useEffect, useCallback, useMemo } from 'react'

import { AnalyticsData } from '@flowx/core-sdk'
import { FlxProcessRenderer } from '@flowx/react-sdk'

import { environment } from './environment'

import { MyCustomComponent } from './components/MyCustomComponent/MyCustomComponent'

import { useLanguage } from './hooks/useLanguage'

const { baseUrl, staticAssetsPath, processApiPath } = environment

const processName = '<PROCESS_NAME>'
const projectId = '<PROJECT_ID>'
const themeId = '<THEME_ID>'
const workspaceId = '<WORKSPACE_ID>'
const processStartData = {}

export default function ProcessComponent() {
  const auth = useAuth()
  const { getSelectedLanguage } = useLanguage()

  const customLoader = useMemo(() => {
    return {
      startProcess: <div>Starting the process...</div>,
      reloadProcess: <div>Loading...</div>,
      action1: <div>Loading action1...</div>,
      action2: <div>Loading action2...</div>,
    }
  }, [])

  const handleProcessEnded = useCallback(() => {
    console.log('Process has ended')
  }, [])

  const analyticsListener = useCallback((event: Event) => {
    const { detail } = event as CustomEvent<AnalyticsData>
    console.log('Received flowx:analytics event:', detail);
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
        workspaceId={workspaceId}
        processApiPath={processApiPath}
        themeId={themeId}
        isDraft={false}
        components={{ MyCustomComponentIdentifier: MyCustomComponent }}
        staticAssetsPath={staticAssetsPath}
        locale="en-US"
        projectInfo={{ projectId }}
        onProcessEnded={handleProcessEnded}
        customLoader={customLoader}
        cache={false}
      />
    )
  )
}
