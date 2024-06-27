import React, { useContext } from 'react'
import rabbit from '../pages/rabbit.png'
import {signOut } from 'firebase/auth'
import { auth } from '../pages/firebase'
import { AuthContext } from '../Context/AuthContext'
const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <div className='navbar'>
      <span className='logo'>WinstA</span>
      <div className='nav-content'>
        <img src={currentUser.photoURL}alt="" height="20px" className='prof-img'/>
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>logout</button> 
      </div>
    </div>
  )
}

export default Navbar
