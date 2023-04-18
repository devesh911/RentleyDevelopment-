import React from 'react'
import { Link } from 'react-router-dom'

import {categories} from '../assets/data'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import Listingitem from '../components/Listingitem'


const Explore = () => {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)
    const [lastFetchedListing, setLastFetchedListing] = useState(null)
    const [loadMore , setLoadMore] = useState(false)
  
  
  
    const params = useParams()
  
    useEffect(() => {
      const fetchListings = async () => {
        try {
          // Get reference
          const listingsRef = collection(db, 'listings')
  
          // Create a query
          const q = query(
            listingsRef,
            orderBy('timestamp', 'desc'),
            limit(10)
          )
  
          // Execute query
          const querySnap = await getDocs(q)
  
          const lastVisible = querySnap.docs[querySnap.docs.length - 1]
          setLastFetchedListing(lastVisible)
  
          const listings = []
  
          querySnap.forEach((doc) => {
            return listings.push({
              id: doc.id,
              data: doc.data(),
            })
          })
  
          setListings(listings)
          setLoading(false)
        } catch (error) {
          toast.error('Could not fetch listings')
        }
      }  
      fetchListings()
      if(listings?.length > 9){
        setLoadMore(true)
      }
    }, [])
  
    // Pagination / Load More
    const onFetchMoreListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, 'listings')
  
        // Create a query
        const q = query(
          listingsRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          startAfter(lastFetchedListing),
          limit(10)
        )
  
        // Execute query
        const querySnap = await getDocs(q)
  
        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchedListing(lastVisible)
  
        const listings = []
  
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
  
        setListings((prevState) => [...prevState, ...listings])
        setLoading(false)
      } catch (error) {
        toast.error('Could not fetch listings')
      }
    }
  return (
    <div className="mx-1 mt-10">
        <header className='mx-1 px-3'>
            <p>Explore</p>
            <div className='flex items-center gap-2 text-[10px] mt-3'>
            <div>
              <img src="" alt="ICON" />
            </div>
            <div>
            <h1>Location</h1>
            <p>Location Details</p>
            </div>
            
            </div>
            
        </header>

        <main className='flex flex-col'>
            {/* <Slider/> */}
            
          
            <div>
            <p className="px-3 text-[50px] font-semibold">Categories</p>

              <div className='grid gap-[16px] md:place-items-center grid-cols-2 md:grid-cols-4 mt-3 p-3 md:px-16' >
             {categories.map((data)=>(
               <div className='md:w-[250px] bg-white drop-shadow-lg rounded-lg '>
                  <Link  to = {`category/${data.name}`}  > 
                <div key={data.name} className='mx-auto md:w-[250px] border rounded-full'>
                <div className='flex item-center'>  
                <img src={data.image} alt="" className="rounded-tl-lg rounded-tr-lg h-24 w-full object-cover md:h-36 "/>

                </div>
                <div className='rounded-lg h-12 flex   items-center bg-white'>
                <p className="text-[16px] w-[100%] p-1 text-center ">{data.name}</p>

                </div>

                </div>
      </Link>
               </div>
                
       
                
  ))}
              </div>
            {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
          <h1 className='text-[50px] mt-3 font-semibold px-3'>Trending products</h1>
          <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:p-3">
          {listings.map((listing) =>   listing.data.listingEnabled && (
             
              <Listingitem
                  listing={listing.data}
                  id={listing.id}
                  keyId={listing.id}
                />
           
             
              )
)}
            
    </div>
            
          </main>

          <br />
          <br />
          {loadMore && lastFetchedListing && (
            <p className='loadMore' onClick={onFetchMoreListings}>
              Load More
            </p>
          )}
        </>
      ) : (
        <p>No listings for </p>
      )}
            </div>
           
        </main>
    </div>
  )
}

export default Explore