import {React, useEffect, useState} from 'react'
import { useNavigate , useLocation } from 'react-router-dom'
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth'

import {ReactComponent as OfferIcon} from '../assets/svg/localOfferIcon.svg'
import {ReactComponent as ExploreIcon} from '../assets/svg/exploreIcon.svg'
import {ReactComponent as PersonOutlineIcon} from '../assets/svg/personOutlineIcon.svg'
// import ()
import {Link} from 'react-router-dom'
import SideNav from './SideNav'

const Navbar = () => {
    const auth = getAuth()   
    const [user, setUser] = useState()

    const navigate = useNavigate()
    const location = useLocation()
    const [toogleNav, setToogleNav] = useState()
    const [formData, setFormData] = useState({
    
      image: ' '
    })
    const { image } = formData

    const pathMatchRoute = (route) => {
        if(route === location.pathname){
            return true
        }
    }
    
  useEffect(()=>{
    setToogleNav(false)

  },[navigate])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setFormData({
          image : auth.currentUser.photoURL
        }
        
        )
      }
      else {
        setFormData({
          image : ''
        }
        
        )

        console.log("state = definitely signed out")
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])
  
    
  const handleToogle = () => {
    if (toogleNav) {
      setToogleNav(false)
    }
    else
      setToogleNav(true)
  }
  

  return (
    // <nav className='navbar'>
    //     <nav className='navbarNav'>
    //         <ul className='navbarListItems'>
    //             <li className='navbarListItems' onClick={() => navigate('/')} >
    //                 <ExploreIcon fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' />
    //                 <p className={
    //                     pathMatchRoute('/') ? 'navbarListItemNameActive' : 'navbarListItemName'
    //                 }>Explore</p>

    //             </li>
    //             <li className='navbarListItems' onClick={() => navigate('/offers')} >
    //                 <OfferIcon fill={pathMatchRoute('/offers') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' />
    //                 <p className={
    //                     pathMatchRoute('/offers') ? 'navbarListItemNameActive' : 'navbarListItemName'
    //                 }>Offer</p>

    //             </li>
    //             <li className='navbarListItems' onClick={() => navigate('/profile')}>
    //                 <PersonOutlineIcon fill={pathMatchRoute('/profile') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' />
    //                 <p className={
    //                     pathMatchRoute('/profile') ? 'navbarListItemActive' : 'navbarListItem'
    //                 }>Profile</p>

    //             </li>
    //         </ul>
    //     </nav>

    // </nav>
    <div>
    <nav className=" w-[100%] fixed top-0 mx-auto p-4 bg-white h-16 z-10 borde ">
      <div className="flex items-center justify-between ">
        <Link to="/">
        <div className="pt-2">
          <img src="LOGO" alt="logo" />
        </div>  
        </Link>
        

        <div className="hidden md:flex space-x-12 items-center">
          <Link className="hover:text-white hover:bg-orange " to="/howitworks">How it works</Link>
          <Link className="hover:text-white hover:bg-orange "  to="/listitem">List item</Link>
          <Link className="hover:text-white hover:bg-orange "  to="/rentalRequests">Requests</Link>
          <div  className= "rounded-full h-8 w-8 flex items-center justify-center cursor-pointer ring-2 ring-white"  onClick={handleToogle}>
          <img className='rounded-full w-8 h-8' src= {image} alt="" />

          </div>
        </div>
        <div className="md:hidden rounded-full h-8 w-8 flex items-center justify-center cursor-pointer ring-2 ring-white"  onClick={handleToogle}>
        <img className="rounded-full ring-2 ring-black w-8 h-8" src={image} alt="" />
        </div>
        {toogleNav &&

          <SideNav/>

        }



      </div>
    </nav>
  </div>

    
  )
}

export default Navbar