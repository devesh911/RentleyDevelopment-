import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc, query, where, collection, getDocs } from "firebase/firestore";
// import { Helmet } from 'react-helmet'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import 'swiper/swiper-bundle.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import shareIcon from "../assets/svg/shareIcon.svg";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import { DateRangePicker } from "react-date-range";
import Request from "../components/Request";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

const Listing = () => {
  const [listing, setListing] = useState({});
  const [requestStatus, setRequeststatus] =useState(false);

  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const [showRentalRequestForm, setShowRentalRequestForm] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();
  
  const listingId = params.listingId

  
 
  
  useEffect(()=>{
    const checkExistingRequest = async () => {
      const rentalRequestsRef = collection(db,'rentalRequest');
      if(auth && auth.currentUser){
        console.log('usr exists')
        const q = query(
          rentalRequestsRef,
          where('productId', '==', listingId),
          where('userId', '==', auth.currentUser.uid)
          )                               
          const snapshot = await getDocs(q);
          console.log(snapshot)
          if (!snapshot.empty) {
            setRequeststatus(true);

          }
      }
    } 
    checkExistingRequest();
    console.log(requestStatus)

    },[auth, listingId])

    

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
    
  }, [navigate, params.listingId]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <main
    className="md:grid grid-cols-2 place-content-center mx-5 md:py-[5rem] md:px-6 md:gap-16
        lg:px-24 xl:px-[5rem] xl:gap-20">
 <section className="max-h-[50vh] relative w-full md:max-h-full md:gap-8 md:grid md:place-content-center overflow-hidden">
                <div className=""> 
                    <img
                        className=" w-[100%] md:w-[500px] object-fit md:rounded-2xl md:cursor-pointer"
                        src={listing.imgUrls[0]}
                        alt="img"
                    />
                </div>

                {/* <button
                    className="absolute grid place-content-center top-1/2 -translate-y-1/2 left-5 rounded-full bg-light p-3 active:scale-110 active:text-element md:hidden">
                </button> */}

                {/* <button
                    className="absolute grid place-content-center top-1/2 -translate-y-1/2 right-5 rounded-full bg-light p-3 active:scale-110 active:text-element  md:hidden">
                </button> */}

                {/* <div className="hidden md:grid grid-cols-4 gap-8">thumbnail</div> */}
               
                <div className="hidden md:block">
                <p className="listingLocationTitle ">Location</p>

                <div className="leafletContainer">
                    <MapContainer style={{height : '100%' , width: '100%'}} 
                    center = {[23.0225 , 72.5714]}
                    zoom={13}
                    scrollWheelZoom={false}>
                        <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
                />
                <Marker
                  position={[23.0225 , 72.5714]}
                >
                  <Popup>{listing.location}</Popup>
                </Marker>
                </MapContainer>
                </div>
                </div>


                
            </section>

         <section className=" pt-6 space-y-6 font-bold pb-10  md:p-0 ">

    <article className="space-y-4 md:space-y-6 ">
        <h1 className="text-xl font-bold capit alize text-primary md:text-4xl xl:text-5xl">
           {listing.title} 
        </h1>
        <p className="text-secondary font-normal">{listing.description}</p>
    </article>

    <div className="flex-col justify-between md:block ">
        <div className="space-x-4 flex items-center ">
            <span className="text-sm md:text-2xl"> ₹{listing.offer
                ? listing.discountedPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} <span>/{listing.rentPeriod}</span> 
                    </span>
           {listing.offer && <span className="text-sm md:text-2xl py-1 px-2 bg-blue-600 rounded-md "><span>{Math.round(100-(listing.discountedPrice*100)/(listing.regularPrice))} % OFF</span></span>} 
        </div>
        <p className="text-sm md:text-2xl text-off line-through text-red-600">{listing.offer && <span>₹{listing.regularPrice}</span>}</p>
    </div>

           <div className=" md:hidden ">
                <p className=" text-l">Location</p>
                <div className="leafletContainer">
                    <MapContainer style={{height : '100%' , width: '100%'}} 
                    center = {[23.0225 , 72.5714]}
                    zoom={13}
                    scrollWheelZoom={false}>
                        <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
                />
                <Marker
                  position={[23.0225 , 72.5714]}
                >
                  <Popup>{listing.location}</Popup>
                </Marker>
                </MapContainer>
                </div>
            </div>
{
  requestStatus ? <Link to="/requestedItems"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Go to requested items</button> </Link>:
  <div className="  ">    
  {showRentalRequestForm? (
  <Request listing = {listing} listingId={listingId} onClose = {() => setShowRentalRequestForm(false)} />
  ):    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => setShowRentalRequestForm(true)}>Request Rental</button>
}

  </div>
}
 
               
      

       

    
</section>   

        </main>
    

//     <main>


// <div className="flex-row ">
//   <div>
//   <img src= {listing.imgUrls[0]} alt="" />

//      <div
//        className="shareIconDiv"
//        onClick={() => {
//          navigator.clipboard.writeText(window.location.href);
//          setShareLinkCopied(true);
//          setTimeout(() => {
//            setShareLinkCopied(false);
//          }, 2000);
//        }}
//      >
//        <img src={shareIcon} alt="" />
//      </div>
//      {shareLinkCopied && <p className="linkCopied">Link Copied!</p>}
 
       
// <p className="listingLocationTitle">Location</p>

// {/* <div className="leafletContainer w-10">
//     <MapContainer style={{height : '100%' , width: '100%'}} 
//     center = {[23.0225 , 72.5714]}
//     zoom={13}
//     scrollWheelZoom={false}>
//         <TileLayer
//   attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//   url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
// />
// <Marker
//   position={[23.0225 , 72.5714]}
// >
//   <Popup>{listing.location}</Popup>
// </Marker>
// </MapContainer>
// </div> */}
//   </div>
//   <div>
//   <div className="listingDetails">
//             <p className="listingName">
//             {listing.title} 
//             </p>
//             <p> ₹
//             {listing.offer
//                 ? listing.discountedPrice
//                     .toString()
//                     .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
//                 : listing.regularPrice
//                     .toString()
//                     .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
//             /{listing.rentPeriod}</p>
//             <p className="text-black mt-5">
//               {listing.description}
//             </p>
//             {/* <p className="listingLocation">{ listing.location}</p>
//             <p className="listingType">
//                 For {listing.type === 'rent' ? 'Rent' : 'Sell'}
//             </p> */}

//             {listing.offer && (
//                 <p className="discountPrice">
//                     ₹{listing.regularPrice - listing.discountedPrice} discount 
//                 </p>
//             )
//             }
//             {/* <ul className="listingDetailsList">
//                 <li>
//                     {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}
//                 </li>
//                 <li>
//                     {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : '1 Bathroom'}
//                 </li>
//                 <li>{listing.parking && 'Parking Spot'}</li>
//                 <li>{listing.furnished && 'Furnished'}</li>
//             </ul> */}
//             <div className="z-10">
//             <Datepicker
//         selected={startDate}
//         onChange={(date) => setStartDate(date)}
//         selectsStart
//         startDate={startDate}
//         endDate={endDate}
//         calendarContainer={MyContainer}

        
//       />
//       <Datepicker
//         selected={endDate}
//         onChange={(date) => setEndDate(date)}
//         selectsEnd
//         startDate={startDate}
//         endDate={endDate}
//         minDate={startDate}
//         calendarContainer={MyContainer}

//       />
//       {auth.currentUser?.uid !== listing.userRef && (
//                 <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`}
//                 className="primaryButton"
//                 > Contact Landlord </Link>
//             )}
//     </div>

//   </div>
// </div>
// </div>
//     </main>
  );
};

export default Listing;
