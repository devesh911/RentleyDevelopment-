import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase.config'

const SideNav = () => {
  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }
  return (
    
     <div className="absolute top-12 bg-white rounded-xl flex flex-col p-6 shadow-2xl right-2">
         <div className="flex flex-col gap-2">

           <Link to='/profile'>Profile</Link>
           <Link to=''>How it works </Link>
           <Link className='text-blue-600' to="/requestedItems">Requested items</Link>
           <Link className='text-blue-600' to="/rentalRequests">Requests</Link>
           <Link className="text-red-500" to="/login">Login</Link>
           <button onClick={onLogout} className="border border-black" to="/singup">SignOut</button>
           
         </div>
         
      </div>
  )
}

export default SideNav
