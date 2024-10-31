import { useCallback, useRef } from 'react'
import { FlxButton } from '@flowx/react-ui-toolkit'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MyCustomComponent = ({ data }: Record<string, any>) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const saveData = useCallback(() => {
    data.actionsFn.saveData({ appData: { name: inputRef.current?.value } })
  }, [data])
  return data ? (
    <div style={{ border: '1px solid black', borderRadius: '1rem', padding: '1rem' }}>
      <h1>Custom component</h1>
      <p>Received Data:</p>
      <p>{JSON.stringify(data.data)}</p>

      <label style={{ marginRight: '0.5rem' }}>Client name</label>
      <input ref={inputRef} type="text" style={{ marginRight: '0.5rem' }} />
      <FlxButton onClick={() => saveData()} style={{ marginTop: '20px' }}>
        {' '}
        Save Data
      </FlxButton>
    </div>
  ) : null
}
