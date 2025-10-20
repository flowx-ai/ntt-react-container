import { useAuth } from 'oidc-react'

import { FlxProcessRenderer, useEnumeration } from '@flowx/react-sdk'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { FlxButton, isDateString } from '@flowx/react-ui-toolkit'
import { isValid, isWeekend, parse, parseISO } from 'date-fns'
import { clearResourcesCache } from '@flowx/core-sdk'
import { environment } from './environment'
import { environment as prodEnvironment } from './environment.prod'
import { PrimeChart } from './components/Chart/PrimeChart.tsx'

const validators = {
  customValidator:
    (...params: string[]) =>
      (v: string) =>
        v === params[0],
  customValidatorAsync:
    (...params: string[]) =>
      async (v: string) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return v === params[0]
      },
  isWeekdayDate: () => (v: string) => {
    if (isDateString(v)) {
      const parsedValue = parseISO(v)

      return isValid(parsedValue) && !isWeekend(parsedValue)
    }

    const parsedValue = parse(v, 'dd.MM.yyyy', new Date())
    return isValid(parsedValue) && !isWeekend(parsedValue)
  },
}

const asyncValidationFunc = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return true
}

const validationFuncFalse = () => false
const validationFuncTrue = () => true

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FlxAsyncValidateComponent = ({ data, registerValidation }: Record<string, any>) => {
  useEffect(() => {
    registerValidation(asyncValidationFunc)
  }, [registerValidation])

  return (
    <div style={{ display: 'block', border: 'dashed 1px #000', padding: '10px' }}>
      Async validation component: {JSON.stringify(data)}
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FlxTrueValidateComponent = ({ data, registerValidation, saveData }: Record<string, any>) => {
  useEffect(() => {
    registerValidation(validationFuncTrue)
  }, [registerValidation])

  return (
    <div style={{ display: 'block', border: 'dashed 1px #000', padding: '10px' }}>
      True validation component: {JSON.stringify(data)}
      <button onClick={() => saveData({ test: 'test' })}>Click to save data</button>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FlxStateValidateComponent = ({ data, registerValidation, saveData }: Record<string, any>) => {
  const [valid, setValid] = useState(false)
  const [localState, setLocalState] = useState({})
  const getValidity = useCallback(() => valid, [valid])
  useEffect(() => {
    registerValidation(getValidity)
    saveData(() => localState)
  }, [registerValidation, getValidity, localState, saveData])

  return (
    <div style={{ display: 'block', border: 'dashed 1px #000', padding: '10px' }}>
      <p>Custom validation component: {JSON.stringify(data)}</p>
      <p>Validity state: {valid ? 'valid' : 'invalid'}</p>
      <p>Local state: {JSON.stringify(localState)}</p>
      <button onClick={() => setValid(!valid)}>Click to toggle validity</button>
      <button
        onClick={() => setLocalState({ app: { qualifications: ['strungar', 'zidar', 'aurar'] } })}
      >
        Click to set saveData
      </button>
      <button
        onClick={() =>
          setLocalState({
            app: {
              qualifications: ['lingurar', 'caldarar', 'ursar'],
              overqualifications: ['magar', 'catar', 'industria calului'],
            },
          })
        }
      >
        Click to set saveData alternate
      </button>
    </div>
  )
}

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const FlxFailValidateComponent = ({ data, registerValidation }: Record<string, any>) => {
  useEffect(() => {
    registerValidation(validationFuncFalse)
  }, [registerValidation])

  return (
    <div style={{ display: 'block', border: 'dashed 1px #000', padding: '10px' }}>
      Fail validation component: {JSON.stringify(data)}
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FlxCustomComponent = ({ data }: Record<string, any>) => {
  const [enumName, setEnumName] = useState('test')
  const enumeration = useEnumeration(enumName)
  return (
    <div style={{ display: 'block', border: 'dashed 1px #000', padding: '10px' }}>
      Custom component: {JSON.stringify(data)} <br />
      <button onClick={() => data.actionsFn.customSaveData()}>Click to send action</button>
      <br />
      <br />
      <select>
        {enumeration.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      <br />
      <br />
      <button onClick={() => setEnumName('cities')}>Load cities</button>
    </div>
  )
}

const FlxCustomValidationComponent = ({
                                        saveData,
                                        registerValidation,
                                        isSubmitted,
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                      }: Record<string, any>) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const validate = useCallback(() => {
    return !!inputRef.current?.value
  }, [inputRef])
  useEffect(() => {
    registerValidation(validate)
    saveData(() => ({
      app: {
        test1: inputRef.current?.value,
        test2: `${inputRef.current?.value}${inputRef.current?.value}`,
      },
    }))
  }, [registerValidation, inputRef, saveData, validate])

  return (
    <>
      Custom validation:
      <input ref={inputRef} />
      {!isSubmitted ? null : <span>This input is required</span>}
    </>
  )
}

const FlxCustomValidation2Component = ({
                                         saveData,
                                         registerValidation,
                                         // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                       }: Record<string, any>) => {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    registerValidation(validationFuncTrue)
    saveData(() => ({
      app: {
        test2: inputRef.current?.value,
        test3: `-----------`,
      },
    }))
  }, [registerValidation, inputRef, saveData])

  return (
    <>
      Custom validation 2:
      <input ref={inputRef} />
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FlxCustomLengthComponent = ({ data }: Record<string, any>) => {
  return (
    <p>
      This is test2:
      {data?.data?.app?.test2?.length}
    </p>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FlxCustomCollectionPrototypeComponent = ({ data }: Record<string, any>) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: 'solid 1px #000',
        padding: '12px',
        borderRadius: '12px',
      }}
      key={data?.data?.name}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {data?.data?.imageURL && (
          <img
            src={data.data.imageURL}
            alt=""
            style={{ width: '40px', height: '40px' }}
          />
        )}
        <span>{data?.data?.name}</span>
      </div>

      <button onClick={() => data?.actionsFn?.saveData()}>Select</button>
    </div>
  )
}

export default function ProcessComponent() {
  const auth = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const { processName, themeId, projectInfo, buildId, locale, language, cache } =
    useMemo(() => {
      const searchParams = new URLSearchParams(location.search)
      return {
        processName: searchParams.get('processName') || '',
        themeId: searchParams.get('themeId') || '',
        projectInfo: {
          projectId: searchParams.get('appId') || '',
        },
        buildId: searchParams.get('buildId') || '',
        locale: searchParams.get('locale') || 'en-US',
        language: searchParams.get('language') || 'en',
        cache: searchParams.get('cache') === 'true',
      }
    }, [location.search])

  useEffect(() => {
    document.addEventListener('flowx:analytics', (e) => {
      console.log('received analytics event', e)
    })
    return () => {
      document.removeEventListener('flowx:analytics', (e) => {
        console.log('removed analytics event', e)
      })
    }
  }, [])

  const { baseUrl, processApiPath, staticAssetsPath } = import.meta.env.DEV ? environment : prodEnvironment

  console.log("before render")

  return auth.userData?.access_token ? (
    <>
      <FlxProcessRenderer
        apiUrl={baseUrl}
        language={language}
        authToken={auth.userData?.access_token}
        themeId={themeId}
        processName={processName}
        processStartData={{ testData: 'abc' }}
        processApiPath={processApiPath}
        isDraft={false}
        components={{
          FlxCustomComponent,
          FlxCustomValidationComponent,
          FlxCustomValidation2Component,
          FlxAsyncValidateComponent,
          FlxStateValidateComponent,
          FlxFailValidateComponent,
          FlxTrueValidateComponent,
          FlxCustomLengthComponent,
          FlxCustomCollectionPrototypeComponent,
          PrimeChart
        }}
        validators={validators}
        staticAssetsPath={staticAssetsPath}
        locale={locale}
        projectInfo={projectInfo}
        buildId={buildId}
        cache={cache ?? true}
        onProcessEnded={() => {
          console.log('process ended')
        }}
      />

      <div className="fixed-buttons">
        <button
          onClick={() => {
            clearResourcesCache()
          }}
        >
          Clear cache
        </button>
        <button
          onClick={() => {
            navigate('/', { replace: true })
          }}
        >
          Back
        </button>
      </div>
    </>
  ) : (
    <>
      <p>No process configured</p>
      <FlxButton onClick={() => navigate('/', { replace: true })}>Go back</FlxButton>
    </>
  )
}
