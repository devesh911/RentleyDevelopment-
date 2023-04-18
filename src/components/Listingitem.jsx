import { Link } from 'react-router-dom'


import { useEffect, useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

function  ListingItem({ listing, id, onEdit, onDelete , onList, keyId}) {
  const [formData,setFormData] = useState({...listing})
  const [isEnabled,setIsEnabled] = useState(listing.listingEnabled)

    const handleClick = async() => {
      const docRef = doc(db, 'listings', id)
      if (formData.listingEnabled === true){
        formData.listingEnabled = false
        setIsEnabled(false)
      }
      else{
        formData.listingEnabled = true
        setIsEnabled(true)
      }
      await updateDoc(docRef, formData)
      if (formData.listingEnabled === true){
        toast.success('List is active')
      }
      else{
        toast.success('List is not active')
      }
      
  }
useEffect(()=>{

})
  return (
    <div div key= {keyId} className="">
    
      <div className=" bg-white drop-shadow-md rounded-lg">
        <img className=" w-[100%] h-24 md:h-44  object-scale-down rounded-tl-lg rounded-tr-lg"
             src={listing.imgUrls[0]}
             alt={listing.title}
        />
        <div className="px-5 md:px-7 py-3 md:py-5 ">
            <h3 className="text-[15px] md:text-lg mb-2">{listing.title}</h3>
            <p className='text-[15px] md:text-sm font-medium text-gray-600'>rent</p>
            <div className="">
                <span className="text-[15px] md:text-sm font-semibold">
                ₹
             {listing.offer
               ? listing.discountedPrice
                   .toString()
                   .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
               : listing.regularPrice
                   .toString()
                   .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
             {listing.type === 'rent' && <span>/{listing.rentPeriod}</span> }

                </span>
                <p className="text-[15px] md:text-sm line-through text-gray-500 md:mt-2">$1000</p>
                <p className="text-[10px] md:text-sm text-red-700">40% off</p>
            </div>
            <div className="flex justify-between items-center pt-3 pb-2">
            <Link  to={`/category/${listing.type}/${id}`}>
                <p 
                    className="px-2 py-1  bg-red-600 hover:bg-amber-600 text-center text-[10px] md:text-sm text-white rounded duration-300">
                    See details</p>
                    </Link>

                <Link to="/whishlist" href="#" title="Add to Favorites"
                    className="md:text-2xl text-sm text-gray-300 hover:text-red-500 duration-300">&hearts;</Link>
            </div>
        </div>
    </div>
    

</div>

    // <li className='categoryListing'>
    //   <Link
    //     to={`/category/${listing.type}/${id}`}
    //     className='categoryListingLink'
    //   >
    //     <img
    //       src={listing.imgUrls[0]}
    //       alt={listing.title}
    //       className='categoryListingImg'
    //     />
    //     <div className='categoryListingDetails'>
          
    //       <p className='categoryListingName'>{listing.title}</p>

    //       <p className='categoryListingLocation'>{listing.location}</p>

    //       <p className='categoryListingPrice'>
    //       ₹
    //         {listing.offer
    //           ? listing.discountedPrice
    //               .toString()
    //               .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    //           : listing.regularPrice
    //               .toString()
    //               .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
    //         {listing.type === 'rent' && <p>/{listing.rentPeriod}</p> }
    //       </p>
  
    //     </div>
    //   </Link>

    //   {onDelete && (
    //     <DeleteIcon
    //       className='removeIcon'
    //       fill='rgb(231, 76,60)'
    //       onClick={() => onDelete(listing.id, listing.name)}
    //     />
    //   )}

    //   {onEdit && <EditIcon className='editIcon' onClick={() => onEdit(id)} />}

    //   {onList && (
    //     <Switch onChange={handleClick} checked={isEnabled} className='editList' height={19}
    //     width={34}
    //     handleDiameter={13}/>
    //   )}
     

    // </li>
  )
}

export default ListingItem