import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from 'oidc-react'

import { FlxIcon } from '@flowx/react-ui-toolkit'

import './Header.scss'

export const Header = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  return (
    <>
      <div
        className="app-header"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '30px' }}>
          <Link to="/" style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
            <img className="flowx-logo" alt="flowx logo" src="/flowx-black.png" />
          </Link>
          <nav style={{ display: 'flex', gap: '20px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>
              Home
            </Link>
            <Link to="/process" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>
              Process
            </Link>
            <Link to="/kitchen-sink" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>
              Kitchen Sink
            </Link>
          </nav>
        </div>
        <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: '30px' }}>
          <form>
            <select>
              <option>language</option>
            </select>
          </form>
          <FlxIcon
            className="logout"
            // name="logoutIcon"
            onClick={() => {
              auth.signOut()
              navigate('/', { replace: true })
            }}
          />
        </div>
      </div>
    </>
  )
}
