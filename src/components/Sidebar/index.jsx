import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import SidebarItems from '../../constants/SideBarItems'

function Sidebar({ history }) {
  const location = useLocation()
  const lastActiveIndexString = localStorage.getItem('lastActiveIndex')
  const lastActiveIndex = Number(lastActiveIndexString)
  console.log({lastActiveIndex})
  const [activeIndex, setActiveIndex] = useState(lastActiveIndex || 0)

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

  useEffect(() => {
    const activeItem = SidebarItems.findIndex(item => getPath(item.route) === getPath(location.pathname))
    changeActiveIndex(activeItem)
  }, [location])

  return (
    <>
      <SidebarParent>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {
            SidebarItems.map((item, index) => {
              return (
                <Link to={item.route} key={item.name}>
                  <SidebarItem active={index === activeIndex}>
                    <p>{item.name}</p>
                  </SidebarItem>
                </Link>
              )
            })
          }
        </div>
        <div className='behind-the-scenes' />
      </SidebarParent>
    </>
  )
}

export default Sidebar;

const SidebarParent = styled.div`
  background: #cf3d2a;

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
`;

const SidebarItem = styled.div`
  padding: 16px 24px;
  transition: all 0.25s ease-in-out;
  background: ${props => props.active ? "#b15b00" : ""};
  margin: 4px 12px;
  border-radius: 4px;

  p {
    color: white;
    font-weight: bold;
    text-decoration: none;
  }

  &:hover {
    cursor: pointer;
  }

  &:hover:not(:first-child) {
    background: #c34a36;
  }
`;
