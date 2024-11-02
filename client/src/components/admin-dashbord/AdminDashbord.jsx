import React, { useState } from 'react'
import HeaderAdmin from './HeaderAdmin'
import HomeAdmin from './HomeAdmin'
import SidebarAdmin from './SidebarAdmin'
import './App.css'
function AdminDashbord() {
    const[openSidebarToggle,setOpenSidebarToggle]=useState(false);
    const openSidebar=()=>{
        setOpenSidebarToggle(!openSidebarToggle)
    }
  return (
    <div className='grid-container'>
        <HeaderAdmin openSidebar={openSidebar}/>
        <HomeAdmin openSidebarToggle={openSidebarToggle}/>
        <SidebarAdmin />
        
    </div>
  )
}

export default AdminDashbord