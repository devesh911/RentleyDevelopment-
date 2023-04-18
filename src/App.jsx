import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import Explore from "./pages/Explore"
import Offers from "./pages/Offers"
import Category from "./pages/Category"
import Profile from "./pages/Profile"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Forgotpassword from "./pages/Forgotpassword"
import Navbar from "./components/Navbar"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Privateroute from "./components/Privateroute"
import CreateListing from "./pages/CreateListing"
import Listing from "./pages/Listing"
import Contact from "./pages/Contact"
import EditListing from "./pages/EditListing"
import RequestedRental from "./pages/RequestedRental"
import Userverification from "./pages/Userverification"
import RentalRequests from "./pages/RentalRequests"

function App() {
  

  return (
    <>
      <Router>
                <Navbar/>

        <div className="absolute top-16 w-full">
           <Routes>
          <Route path='/' element={<Explore/>} />
          <Route path='/offers' element={<Offers/>} />
          <Route path='/category/:categoryName' element={<Category/>} />
          <Route path='/profile' element={<Privateroute/>}>
            <Route path='/profile' element={<Profile/>} />
          </Route>
          <Route path='/signin' element={<Signin/>} />
          <Route path='/sign-up' element={<Signup/>} />
          <Route path='/forgotpassword' element={<Forgotpassword/>} />
          <Route path='/create-listing' element={<CreateListing/>} />
          <Route path='/edit-listing/:listingId' element={<EditListing/>} />
          <Route path='/category/:categoryName/:listingId' element={<Listing/>} /> 
          <Route path='/contact/:landlordId' element={<Contact/>} /> 
          <Route path='/requestedItems' element={<RequestedRental/>} /> 
          <Route path='/rentalRequests' element={<RentalRequests/>} /> 
          <Route path='/verification' element={<Userverification/>} /> 
          <Route path='/order/:requestId' element={<Userverification/>} /> 

        </Routes>
        </div>
       
      </Router>
      <ToastContainer/>
    </>
  )
}

export default App
