import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where,doc, updateDoc, orderBy } from 'firebase/firestore'
import React, { useCallback } from 'react'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import RentalRequestCard from '../components/RentalRequestCard'
import Spinner from '../components/Spinner'

import { db } from '../firebase.config'

const RentalRequests = () => {

  const auth = getAuth();
  const [rentalRequests, setRentalRequests] = useState(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null);

  const fetchRentalRequests = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    const rentalRequestsRef = collection(db, 'rentalRequest');
    const q = query(
      rentalRequestsRef,
      where('OwnerId', '==', auth.currentUser.uid),
      orderBy('timestamp', 'desc')

    );

    try {
      const querySnapshot = await getDocs(q);
      let rentals = [];

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
    

    fetchRentalRequests();
    console.log(fetchRentalRequests)
  }, [fetchRentalRequests]);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleAccept = async (request) => {
    try {
      const rentalRequestRef = doc(db, 'rentalRequest', request.id);
      await updateDoc(rentalRequestRef, { status: 'approved' });
      // Send notification to user
      toast.success('Rental request approved!');
      setRentalRequests((prevRequests) =>
        prevRequests.filter((req) => req.id !== request.id)
      );
    } catch (error) {
      toast.error('Something went wrong');
      console.error('Error approving rental request:', error);
    }
  };

  const handleDeny = async (request) => {
    try {
      const rentalRequestRef = doc(db, 'rentalRequest', request.id);
      await updateDoc(rentalRequestRef, { status: 'denied' });
      // Send notification to user
      toast.success('Rental request denied!');
      setRentalRequests((prevRequests) =>
        prevRequests.filter((req) => req.id !== request.id)
      );
    } catch (error) {
      toast.error('Something went wrong');
      console.error('Error denying rental request:', error);
    }
  };
  console.log("requests",rentalRequests)

 
  return (
    <div className='mt-5 flex-row w-auto container mx-auto items-center justify-center '>
    <p className='font-semibold container mx-auto text-center uppercase text-[40px] md:text-[50px] px-3 m-1 text-blue-600 '>Requests</p>
    <p className='font-medium container md: max-w-[30vw] mx-auto text-center uppercase text-[15px] md:text-[25px] px-3 mb-3 text-blue-600 '>Please accept or deny a request within 24 hours of requet made</p>
      {loading ? (<Spinner/>) : 
      
      rentalRequests && rentalRequests.length > 0 ? (
        rentalRequests.map((request) => (
          <div className='w-full px-6 md:m-3' key={request.id}>
            <RentalRequestCard
              request = {request}
              id = {request.id}
              rentals = {request.data}
              handleAccept = {handleAccept}
              handleDeny = {handleDeny}
  
            />
            
          </div>
        ))
      ) : (<p>No requests</p>)
      }

      
    </div>
  );
};

export default RentalRequests
