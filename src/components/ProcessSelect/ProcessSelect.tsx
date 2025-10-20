import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  FlxButton,
  FlxTabBar,
  FlxTab,
  FlxTabList,
  FlxTabContentItem,
  FlxTabContent,
} from '@flowx/react-ui-toolkit'

import './ProcessSelect.scss';

import { useAuth } from 'oidc-react'

const LS_FORM_KEY = 'flx-process-setup'

export const ProcessSelect = (): JSX.Element => {
  const processDetails = localStorage.getItem(LS_FORM_KEY)
  const parsedProcessDetails = processDetails ? JSON.parse(processDetails) : {}
  const [processName, setProcessName] = useState(parsedProcessDetails?.processName ?? '')
  const [viewId, setViewId] = useState(parsedProcessDetails?.viewId ?? '')
  const [themeId, setThemeId] = useState(
    parsedProcessDetails?.themeId ?? '12345678-1234-1234-1234-123456789012'
  )
  const [appId, setAppId] = useState(
    parsedProcessDetails?.appId ?? '87654321-4321-4321-4321-987654321012'
  )
  const [buildId, setBuildId] = useState(parsedProcessDetails?.buildId ?? '')
  const [workspaceId, setWorkspaceId] = useState(parsedProcessDetails?.workspaceId ?? '')
  const [locale, setLocale] = useState(parsedProcessDetails?.locale ?? 'en-US')
  const [language, setLanguage] = useState(parsedProcessDetails?.language ?? 'en')
  const [caching, setCaching] = useState(parsedProcessDetails?.cache ?? true)

  const navigate = useNavigate()
  const auth = useAuth()

  console.log(auth)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    localStorage.setItem(
      LS_FORM_KEY,
      JSON.stringify({
        processName,
        viewId,
        themeId,
        appId,
        buildId,
        workspaceId,
        locale,
        language,
        cache: caching,
      })
    )
    if (processName) {
      navigate(
        `/process?processName=${processName}&themeId=${themeId}&appId=${appId}&workspaceId=${workspaceId}&locale=${locale}&buildId=${buildId}&language=${language}&cache=${caching}`
      )
    }

    if (viewId) {
      navigate(
        `/task-manager?viewId=${viewId}&themeId=${themeId}&appId=${appId}&workspaceId=${workspaceId}&locale=${locale}&language=${language}&cache=${caching}`
      )
    }
  }

  const renderProcessRendererTab = () => (
    <div className="content-wrapper">
      <label>
        Process Name
        <input
          type="text"
          name="processName"
          value={processName}
          onChange={(e) => setProcessName(e.target.value)}
          data-testid="processName"
        />
      </label>
      <label>
        Project ID
        <input
          type="text"
          name="appId"
          value={appId}
          onChange={(e) => setAppId(e.target.value)}
          data-testid="projectId"
        />
      </label>
      <label>
        Workspace ID
        <input
          type="text"
          name="workspaceId"
          value={workspaceId}
          onChange={(e) => setWorkspaceId(e.target.value)}
          data-testid="workspaceId"
        />
      </label>
      <label>
        Theme ID
        <input
          type="text"
          name="themeId"
          value={themeId}
          onChange={(e) => setThemeId(e.target.value)}
          data-testid="themeId"
        />
      </label>
      <label>
        Build ID
        <input
          type="text"
          name="buildId"
          value={buildId}
          onChange={(e) => setBuildId(e.target.value)}
          data-testid="buildId"
        />
      </label>
      <label>
        Locale
        <input
          type="text"
          name="locale"
          value={locale}
          onChange={(e) => setLocale(e.target.value)}
          data-testid="locale"
        />
      </label>

      <label>
        Language
        <input
          type="text"
          name="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          data-testid="language"
        />
      </label>
      <label>
        Cache?
        <input
          type="checkbox"
          checked={caching}
          onChange={() => setCaching(!caching)}
          data-testid="cache"
        />
      </label>
    </div>
  )

  const renderTaskManagerTab = () => (
    <div className="content-wrapper">
      <label>
        Task View Id (resourceDefinitionId)
        <input
          type="text"
          name="viewId"
          value={viewId}
          onChange={(e) => setViewId(e.target.value)}
        />
      </label>
      <label>
        Project ID
        <input
          type="text"
          name="appId"
          value={appId}
          onChange={(e) => setAppId(e.target.value)}
        />
      </label>
      <label>
        Workspace ID
        <input
          type="text"
          name="workspaceId"
          value={workspaceId}
          onChange={(e) => setWorkspaceId(e.target.value)}
        />
      </label>
      <label>
        Theme ID
        <input
          type="text"
          name="themeId"
          value={themeId}
          onChange={(e) => setThemeId(e.target.value)}
        />
      </label>
      <label>
        Locale
        <input
          type="text"
          name="locale"
          value={locale}
          onChange={(e) => setLocale(e.target.value)}
        />
      </label>

      <label>
        Language
        <input
          type="text"
          name="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
      </label>
      <label>
        Cache?
        <input
          type="checkbox"
          checked={caching}
          onChange={() => setCaching(!caching)}
          data-testid="cache"
        />
      </label>
    </div>
  )

  return (
    <div className="process-select-wrapper">
      <FlxButton
        className="flx-button-container logout-button"
        type="submit"
        data-testid="LogoutButton"
        onClick={() => {
          auth.signOut()
        }}
      >
        Logout
      </FlxButton>
      <div className="card">
        <form
          noValidate
          onSubmit={handleSubmit}
        >
          <FlxTabBar defaultValue={0}>
            <FlxTabList>
              <FlxTab
                title="Process Renderer"
                id={0}
              />
              <FlxTab
                title="Task Manager"
                id={1}
              />
            </FlxTabList>
            <FlxTabContent>
              <FlxTabContentItem value={0}>{renderProcessRendererTab()}</FlxTabContentItem>
              <FlxTabContentItem value={1}>{renderTaskManagerTab()}</FlxTabContentItem>
            </FlxTabContent>
          </FlxTabBar>
          <FlxButton
            className="flx-button-container"
            type="submit"
            data-testid="startProcess"
          >
            Start
          </FlxButton>
        </form>
      </div>
    </div>
  )
}
