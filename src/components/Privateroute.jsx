import React from 'react'
import { Navigate , Outlet } from 'react-router-dom'
import useAuthStatus from '../hooks/useAuthStatus'
import Spinner from './Spinner'

const Privateroute = () => {
    const {loggedIn , checkingStatus } = useAuthStatus()
    if(checkingStatus){
        return <Spinner/>
    }

  return loggedIn? <Outlet/> : <Navigate to='/signin' />
}

export default Privateroute