import { useState } from 'react'
import './sidebarContent.scss'


export const SidebarContent = (props) => {

  return (
    <div className='sidebar-content'>
      <div className="icon"><img width='30px'src={props?.source} alt={props?.alt} /></div>
      <div className="content-name">{props?.contentName}</div>
    </div>
  )
}
