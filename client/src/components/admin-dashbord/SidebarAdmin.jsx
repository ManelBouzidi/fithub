import React from 'react'

import { BsCart3,BsFillArchiveFill, BsFillGearFill, BsGrid1X2Fill, BsListCheck, BsPeopleFill } from 'react-icons/bs'
import './App.css'

function SidebarAdmin({openSidebarToggle}) {
  return (
    <aside id='sidebar' className={openSidebarToggle ? "sidebar-responsive" :""}>
        <div className='sidebar-title'>
        <div className='sidebar-brand'>
         <BsCart3 className='icon_header'/>SHOP
        </div>
        <span className='icon close_icon'>X</span>
        </div>
        <ul className='sidebar-list'>
          <li className='sidebar-list-item'>
             <a href=''><BsGrid1X2Fill className='icon'/>Dashbord</a>
          </li>
          <li className='sidebar-list-item'>
             <a href=''><BsListCheck className='icon'/>Inventory</a>
          </li>
          <li className='sidebar-list-item'>
             <a href=''><BsFillArchiveFill className='icon'/>products</a>
          </li>
          <li className='sidebar-list-item'>
             <a href=''><BsPeopleFill className='icon'/>Categories</a>
          </li>
          <li className='sidebar-list-item'>
             <a href=''><BsFillGearFill className='icon'/>Setting</a>
          </li>
        </ul>
    </aside>
  )
}

export default SidebarAdmin