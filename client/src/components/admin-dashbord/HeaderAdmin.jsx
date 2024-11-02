import React from 'react'
import {BsFillBellFill, BsFillEnvelopeFill, BsJustify, BsPersonCircle, BsSearch}from 'react-icons/bs'
import './App.css'
function HeaderAdmin({openSidebar}) {
  return (
    <Header className='header'>
<div className='menu-icon'>
<BsJustify className='icon' onClick={openSidebar}/>
</div>
<div className='header-left'>
    <BsSearch className='icon'/>
</div>
<div className='header-right'>
    <BsFillBellFill className='icon'/>
    <BsFillEnvelopeFill className='icon'/>
    <BsPersonCircle className='icon'/>
</div>
    </Header>
  )
}

export default HeaderAdmin