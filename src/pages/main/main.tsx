import { useEffect, useRef } from 'react'

import { useNavigate, useSearchParams } from 'react-router-dom'

import { FlxCard } from '@flowx/react-ui-toolkit'

import './main.scss'

export const Main = () => {
  const selectedProcessId = useRef('')
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const startProcess = (
    processName?: string,
    themeId?: string,
    appId?: string,
    startCondition?: string
  ) => {
    const startData: Record<string, unknown> = {}

    if (startCondition) {
      startData.startCondition = startCondition
    }

    navigate(`/process`, {
      state: {
        processName: processName || selectedProcessId,
        processStartData: startData,
        themeId,
        appId,
      },
    })
  }

  useEffect(() => {
    if (searchParams.has('processName')) {
      startProcess(
        searchParams.get('processName') as string,
        searchParams.get('startCondition') as string,
        searchParams.get('themeId') as string,
        searchParams.get('appId') as string
      )
    }
  })

  return (
    <div className="main-container">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <FlxCard style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '32px' }}
          >
            <button onClick={() => startProcess('<PROCESS_NAME>', '<APP_ID>', '<THEME_ID>')}>
              Start Demo Process
            </button>
          </div>
        </FlxCard>
      </div>
    </div>
  )
}
