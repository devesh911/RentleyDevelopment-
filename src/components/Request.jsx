import { React, useEffect, useState } from 'react'
import { db, auth } from '../firebase.config'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

import DatePicker from "../components/DatePicker";

import moment from 'moment';

import { useNavigate } from 'react-router-dom';

const Request = ({ listing, listingId, onClose }) => {


  // set details which a user would love to see before accepting requests

  const [endDate, setEndDate] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [rentalPeriod, setRentalperiod] = useState(null);



  const navigate = useNavigate();
  useEffect(() => {
    setDatecheck(false)
    if (startDate && endDate !== null) {
      let diff = new moment.duration(endDate.getTime() - startDate.getTime());

      setRentalperiod(Math.round(diff.asDays()))

    }
  }, [endDate])

  const [dateCheck, setDatecheck] = useState(false)





  // Create a new rental request document in Firestore
  const createRentalRequest = async () => {
    const user = auth.currentUser;
    const userId = user ? user.uid : null;

    if (endDate === null) {

      setDatecheck(true)

    }
    else {
      setDatecheck(false)

      if (userId) {
        // // Create a new rental request document in Firestore
        await addDoc(collection(db, "rentalRequest"), {
          userId: userId,
          OwnerId: listing.userRef,
          startDate : startDate,
          endDate : endDate,
          productId : listingId,
          rentalPeriod: rentalPeriod,
          status: 'pending',
          timestamp: serverTimestamp(),

        });
        navigate('/requestedItems')
        console.log('collection created')
      }

      // Close the rental request form
    }
  }


  return (
    <>
   
        <div>
     
        <div className="flex justify-center md:block">
          
          <DatePicker
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            startDate={startDate}
            endDate={endDate}
  
          />
        </div>
        <div className='flex flex-col justify-center  items-center space-y-2 mt-5'>
          <button className='w-[100%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded text-light shadow-2xl shadow-element md:flex-[65%] active:scale-95 hover:opacity-70 duration-200'
            onClick={createRentalRequest}>Send Request</button>
  
          <button className="w-[100%] bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded text-light shadow-2xl shadow-element md:flex-[65%] active:scale-95 hover:opacity-70 duration-200" onClick={onClose}>Cancel</button>
          {dateCheck && <p className='text-red-500 text-sm  font-normal	'>please select tenure</p>}
  
        </div>
  
  
  
      </div>
        

    </>
   
  )
}

export default Request;
