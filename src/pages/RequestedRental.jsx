import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where,doc, updateDoc, orderBy } from 'firebase/firestore'

import { toast } from 'react-toastify'
import RentalRequestCard from '../components/RentalRequestCard'
import Spinner from '../components/Spinner'
import { db } from '../firebase.config'

const RequestedRental = () => {
  const auth = getAuth();
  const [rentalRequests, setRentalRequests] = useState(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null);

  
  const fetchRequests = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    const rentalRequestsRef = collection(db, 'rentalRequest')
                      

    const q = query(
      rentalRequestsRef,
      where('userId', '==', auth.currentUser.uid),
      orderBy('timestamp', 'desc')



    );

    try {
      const querySnapshot = await getDocs(q);
      let rentals = [];
      console.log(querySnapshot);
      querySnapshot.forEach((doc)=>{
         rentals.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setRentalRequests(rentals);
    } catch (error) {
      console.error('Error fetching rental requests:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    

    fetchRequests()
  }, [fetchRequests]);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  
  return (
    <div className='mt-5 flex-row mx-auto container md:m-auto-x justify-center items-center'>
      {loading ? (<Spinner/>) : 
      
      rentalRequests && rentalRequests.length > 0 ? (
        rentalRequests.map((request) => (
          <div className='w-full px-6 md:m-3' key={request.id}>
            <RentalRequestCard
              request = {request}
              id = {request.id}
              rentals = {request.data}
            />
            
          </div>
        ))
      ) : (<p>No requests</p>)
      }

      
    </div>
  )
}

export default RequestedRental
