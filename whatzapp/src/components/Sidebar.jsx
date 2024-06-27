import React from 'react'
import Navbar from './navbar'
import Searchbar from './searchbar'
import Chats from './Chats'
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Navbar></Navbar>
      <Searchbar/>
      <Chats></Chats>
      
    </div>
  )
}

export default Sidebar
