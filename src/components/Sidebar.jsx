import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { DisplaySettings, CurrencyRupee, SettingsAccessibility, Home } from '@mui/icons-material'
import SidebarItems from './SidebarItems'
import { ToggleSwitch } from './Switch'
import { BASE_URL } from '../../endpoint'

const Logo = ({ name }) => {
  const result = name.match(/([A-Z][a-z]+)([A-Z][a-z]+)/)
  let data, guard
  if (result) {
    data = result[1]
    guard = result[2]
  }

  return (
    <DataGuard>
      <span>{data}</span>
      <span className='guard-style'>{guard}</span>
    </DataGuard>
  )
}

function Sidebar({ activeIndex, setActiveIndex, pageData, setPageData }) {
  const location = useLocation()
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    const activeItem = SidebarItems.findIndex(item => getPath(item.route) === getPath(location.pathname))
    changeActiveIndex(activeItem)
  }, [location])

  useEffect(() => {
    const hasDisabledPlugins = pageData?.plugins?.some(plugin => plugin.isDisabled)
    setIsEnabled(!hasDisabledPlugins)
  }, [pageData])

  function changeActiveIndex(newIndex) {
    localStorage.setItem('lastActiveIndex', newIndex)
    setActiveIndex(newIndex)
  }

  function getPath(path) {
    if (path.charAt(0) !== '/') {
      return '/' + path
    }
    return path
  }

  const changePluginState = async () => {
    try {
      const tabId = SidebarItems[activeIndex].id
      const { plugins = [] } = pageData || {}

      let response
      if (isEnabled) {
        // Disable all plugins
        response = await fetch(`${BASE_URL}/api/tab/${tabId}/toggle-disable`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ isEnabled: false })
        })
      } else {
        // Enable all plugins
        response = await fetch(`${BASE_URL}/api/tab/${tabId}/toggle-disable`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ isEnabled: true })
        })
      }

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const updatePlugins = plugins.map((plugin) => {
        return {
          ...plugin,
          isDisabled: isEnabled
        }
      })

      setPageData({ ...pageData, plugins: updatePlugins })
      setIsEnabled(!isEnabled)
    } catch (error) {
      console.error('Error updating plugin status:', error)
    }
  }

  const IconComponent = ({ icon }) => {
    switch (icon) {
      case 'Marketing':
        return <DisplaySettings style={{ color: 'black' }} />
      case 'Finance':
        return <CurrencyRupee style={{ color: 'black' }} />
      case 'Personnel':
        return <SettingsAccessibility style={{ color: 'black' }} />
      default:
        return <Home style={{ color: 'black' }} />
    }
  }
  

  return (
    <>
      <SidebarParent isSwitchEnabled={isEnabled}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            {
              SidebarItems.map((item, index) => {
                return (
                  <Link to={item.route} key={item.name}>
                    <SidebarItem active={index === activeIndex} isLogo={item.isLogo}>
                      {item.isLogo ? (
                        <Logo name={item.name} />
                      ) : (
                        <div className='navigation-list-style'>
                          {/* <CurrencyRupee style={{ color: 'black' }} /> */}
                          <IconComponent icon={item.name} />
                          <p className='navigation-list-style-text'>{item.name}</p>
                        </div>
                      )}
                    </SidebarItem>
                  </Link>
                )
              })
            }
          </div>
          <div className='switch-container'>
            <span className='switch-copy'>All Plugins {isEnabled ? 'Enabled' : 'Disabled'}</span>
            <ToggleSwitch checked={isEnabled} onChange={() => changePluginState()} />
          </div>
        </div>
        <div className='behind-the-scenes' />
      </SidebarParent>
    </>
  )
}

export default Sidebar

const SidebarParent = styled.div`
  background: #f1f1f1;
  
  a {
    text-decoration: none;
  }
  
  & > div {
    width: 250px;
    height: 100vh;
  }
  
  .behind-the-scenes {
    width: 250px;
  }

  .switch-container {
    padding: 10px 24px;
    font-size: 14px;
    background: ${props => props.isSwitchEnabled ? 'linear-gradient(0deg, hsla(90, 78%, 59%, 1) 0%, hsla(96, 68%, 78%, 1) 10%, hsla(0, 0%, 95%, 1) 26%)' : 'linear-gradient(0deg, hsla(0, 78%, 59%, 1) 0%, hsla(0, 68%, 78%, 1) 10%, hsla(0, 0%, 95%, 1) 26%)'};
  }

  .switch-copy {
    color: #000;
  }
`;

const SidebarItem = styled.div`
  padding: ${props => props.isLogo ? "16px 24px" : "5px 24px"};
  transition: all 0.25s ease-in-out;
  background: ${props => props.active ? "#fff" : ""};
  margin-top: 4px;
  border-radius: 4px;

  p {
    color: black;
    font-weight: bold;
    text-decoration: none;
  }
  
  &:hover {
    cursor: pointer;
  }
  
  &:hover:not(:first-child) {
    background: #fff;
  }

  .navigation-list-style-text {
    margin-left: 10px;
  }

  .navigation-list-style {
    display: flex;
    align-items: center;
  }
`;

const DataGuard = styled.div`
  color: #36454F;
  font-size: 32px;

  .guard-style {
    font-weight: 900;
  }
`
