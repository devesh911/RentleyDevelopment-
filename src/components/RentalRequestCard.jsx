import { collection, doc, getDoc } from 'firebase/firestore'
import React, { useState, useEffect, useCallback } from 'react'
import { db } from '../firebase.config'
import { Link } from 'react-router-dom'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const RentalRequestCard = ({request,rentals,handleAccept,handleDeny}) => {

  const [product, setProduct] = useState(null)
  const [toogleDetails, setToogleDetails] = useState(false)


  const handleToogle = () =>{
    if (!toogleDetails){
      setToogleDetails(true)
    }
    else{
      setToogleDetails(false)
    }
    
  }
  const fetchProduct = useCallback(async ()=>{
   
      const listingsRef = collection(db, 'listings')
      const productDocRef = doc(listingsRef, rentals.productId)
      const productDocSnap = await getDoc(productDocRef)
      setProduct(productDocSnap.data())
    
  },[])

  useEffect(() => {

    fetchProduct()
  }, [fetchProduct])

  const Reqid = request.id
  const str = JSON.stringify(Reqid)
  const uniqueRequestId = str.slice(-5,-1);
  const options = { dateStyle: 'long' };
  const date = new Date(rentals.timestamp?.seconds * 1000).toLocaleString('en-US', options);
  const starDate =  new Date(rentals.startDate?.seconds * 1000).toLocaleString('en-US', options);
  const endDate =  new Date(rentals.endDate?.seconds * 1000).toLocaleString('en-US', options);
  return (
    <div className='flex flex-col items-center  w-full '>
      <div className='w-full   rounded-lg shadow-md lg:max-w-sm bg-white p-3'>
        <div className='flex justify-between items-center'>
        <img
                className="object-contain w-16 md:w-[100px] ml-1"
                src={product && product.imgUrls[0]}
                alt= {`${product?.title}`}
            />
          <div>
            <h1 className='text-[15px] md:text-lg uppercase p-2'><span className='font-bold'>ID</span>: {uniqueRequestId}</h1>
            <p className='text-[10px] md:text-sm p-2'>{date}</p>
          </div>
          <div className='flex flex-col items-end'>
          <p
            className={`uppercase font-medium p-2 text-[15px] md:text-lg ${
             rentals.status ==='pending'?'text-amber-400': rentals.status === 'approved' ? 'text-green-500' : 'text-red-500'
            } `}
          >
            {rentals.status}
          </p>
          {
            rentals.status === "approved" && !handleAccept ? <Link to={`/order/${request.id}`} className='p-2 text-[9px] md:text-sm'>Complete order</Link> : <p className='p-2 text-[10px] md:text-sm'>Something</p>
          
          }
          </div>
        </div>
      </div>
      
        <div className=''>
          
          <div className='m-1 text-[15px] md:text-lg flex flex-col justify-center items-center'>
          <button className='font-semibold' onClick={handleToogle}>Show details</button>
          <IoIosArrowDown/>
          </div>
       

         { toogleDetails && 
          <div className=" w-auto bg-grey relative bottom-12 md:bottom-16" >
          <div className=" flex-col  justify-center items-center  shadow-md lg:max-w-sm bg-gray-100 p-3">
        <div className='flex-col justify-center items-center'>
          <img
                className="object-scale-down w-full"
                src={product && product.imgUrls[0]}
                alt="image"
            />
            <div className="p-2">
                <h4 className="p-2 text-xl md:text-2xl uppercase font-semibold tracking-tight text-blue-600">
                   {product && product.title}
                </h4>
                <div className=''>
                  <div className='text-[15px] md:text-lg p-2'><span className='font-semibold uppercase'>rent Start date:</span><span className='pl-2'> {starDate}</span></div>
                  <div className='text-[15px] md:text-lg p-2'><span className='font-semibold uppercase'>rent End date:</span><span className='pl-2'> {endDate}</span></div>
                  <div className='p-2 text-[15px] md:text-lg'><span className='font-semibold uppercase'>Rental period:</span><span className='pl-2'> {rentals.rentalPeriod} days</span></div>
                  <div className='p-2 text-[15px] md:text-lg'><span className='font-semibold uppercase'>Estimated earning:</span><span className='pl-2'> 15000 rupiya</span></div>
                  
                  </div>
           </div>
        </div>
        {handleAccept && (rentals.status === 'pending'  ?
            <div className='grid grid-row-1 gap-2 w-1/2 mx-auto'>
              <button className='px-4 py-2 text-[15px] md:text-lg text-blue-100 bg-green-500 rounded shadow' onClick={()=>handleAccept(request)}>Accept</button>
              <button className='px-4 py-2 text-[15px] md:text-lg text-blue-100 bg-red-500 rounded shadow' onClick={()=>handleDeny(request)}>Deny</button>
            </div>
            : <p
            className={`uppercase font-medium p-2  ${
             rentals.status =='pending'?'text-amber-400': rentals.status === 'approved' ? 'text-green-500' : 'text-red-500'
            } font-bold`}
          >
            {rentals.status}
          </p>
              
            )}
        
        <div className='flex flex-col justify-center items-center mt-2'>
                    <IoIosArrowUp/>

          <button className='font-semibold text-[15px] md:text-lg'  onClick={handleToogle}>Hide details</button>
          </div>
        </div>

          </div>} 
</div>
      </div>
    
  )
}

export default RentalRequestCard
