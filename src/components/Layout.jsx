import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Nav from './Nav'

function Layout(props) {
  const { activeIndex, setActiveIndex, pageData, setPageData } = props || {}
  return (
    <div>
      <div style={{display: "flex"}}>
        <Sidebar history={props.history} activeIndex={activeIndex} setActiveIndex={setActiveIndex} pageData={pageData} setPageData={setPageData} />
        <div>
          {/* <Nav /> */}
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Layout
