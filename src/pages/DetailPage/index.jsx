import React, { useEffect } from 'react'
import SidebarItems from '../../components/SidebarItems'
import { ToggleSwitch } from '../../components/Switch'
import { styled } from 'styled-components'
import { BASE_URL } from '../../../endpoint'

const Details = ({ activeIndex, pageData, setPageData }) => {
  useEffect(() => {
    const id = SidebarItems[activeIndex].id
    fetchPageSpecificData(id)
  }, [activeIndex])

  const fetchPageSpecificData = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/tab/${id}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const jsonData = await response.json()
      setPageData(jsonData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const {
    title,
    plugins = []
  } = pageData || {}

  const pluginSwitch = async (status, pluginId) => {
    try {
      const tabId = SidebarItems[activeIndex].id
      const newStatus = status === 'Active' ? 'Inactive' : 'Active'
      const response = await fetch(`${BASE_URL}/api/tab/${tabId}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pluginId, newStatus })
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const updatedPlugins = plugins.map((plugin) => {
        if (plugin.pluginId === pluginId) {
          return { ...plugin, status: newStatus }
        }
        return plugin
      })
  
      setPageData({ ...pageData, plugins: updatedPlugins })
    } catch (error) {
      console.error('Error updating plugin status:', error)
    }
  }

  return (
    <Page>
      <div className='title'>{title} Plugins</div>
      <div className='plugins-container'>
        {plugins.map(({ title, description, status, isDisabled, pluginId }) => {
          return (
            <div className={`plugin-card ${isDisabled ? 'disabled' : ''}`}>
              <div className='plugin-card-header'>
                <div className='plugin-card-title'>{title}</div>
                <div>
                  <ToggleSwitch checked={status === 'Active'} onChange={() => pluginSwitch(status, pluginId)} />
                  <div className={`toggleSwitch-copy ${status === 'Active' ? 'allowed-style' : 'blocked-style'}`}>{status === 'Active' ? 'Allowed' : 'Blocked'}</div>
                </div>
              </div>
              <div className='plugin-card-body'>
                <div>{description}</div>
              </div>
            </div>
        )})}
      </div>
    </Page>
  )
}

export default Details

const Page = styled.div`
  .title {
    font-size: 20px;
    margin: 32px;
    color: #A9A9A9;
  }

  .plugins-container {
    display: flex;
    flex-wrap: wrap;
    padding-left: 15px;
  }

  .plugin-card {
    display: flex;
    flex-direction: column;
    margin: 20px;
    height: 200px;
    width: 340px;
    border: 1px solid #A9A9A9;
    border-radius: 10px;
    justify-content: space-between;
  }

  .disabled {
    opacity: 0.5;
    pointer-events: none;
    background: #f5f5f5;
    border: 1px solid #ccc;
  }

  .plugin-card-header {
    display: flex;
    justify-content: space-between;
    padding: 10px 30px;
    align-items: center;
  }

  .plugin-card-body {
    padding: 30px;
    color: #A9A9A9;
  }

  .plugin-card-title {
    color: #A9A9A9;
  }

  .toggleSwitch-copy {
    font-size: 12px;
    text-align: center;
  }

  .allowed-style {
    color: #52d869;
  }

  .blocked-style {
    color: red;
  }
`