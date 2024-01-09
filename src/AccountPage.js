// import React, { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { doc as firestoreDoc, getDoc, getFirestore } from "firebase/firestore";
// import { auth } from "./firebase";
// import WeatherData from "./Weather";
// import axios from "axios";
// import rateLimit from "axios-rate-limit";

// const AccountPage = () => {
//   const [userData, setUserData] = useState(null);
  // const [userStats, setUserStats] = useState(null);

  // const http = rateLimit(axios.create(), {
  //   maxRequests: 1,
  //   perMilliseconds: 1000,
  // });

  // useEffect(() => {
  //   const fetchUserDetails = async (user) => {
  //     try {
  //       if (user) {
  //         const db = getFirestore();
  //         const docRef = firestoreDoc(db, "users", user.uid);
  //         const docSnap = await getDoc(docRef);
  //         if (docSnap.exists()) {
  //           const data = docSnap.data();
  //           setUserData(data);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching account details:", error);
  //     }
  //   };

  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     fetchUserDetails(user);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  // useEffect(() => {
  //   const fetchUserStats = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8000/specialists");
  //       const data = await response.json();

  //       // Find the userStats that matches the userData.name
  //       const matchingStats = data.find(
  //         (stats) => stats.name === userData?.name
  //       );
  //       setUserStats(matchingStats);
  //     } catch (error) {
  //       console.error("Error fetching user stats:", error);
  //     }
  //   };

  //   // Fetch userStats only when userData is available
  //   if (userData) {
  //     fetchUserStats();
  //   }
  // }, [userData]);

//   return (
//     <>
//       <div id="modal-account">
//         <div className="modal-content" style={{ border: "0" }}>
//           <div className="container">
//             <br />
//           </div>
//           <div className="account-details">
//             {userData ? (
//               <div>
//                 <br />
//                 <h5>Welcome!</h5>
//                 <br />
//                 {/* <p className="mb-0 pb-0">Your stats:</p>
//                 {userStats ? (
//                   <>
//                     <p className="m-0 p-0">{userStats.SC}</p>
//                     <p className="m-0 p-0">{userStats.bonus}</p>
//                     <hr />
//                     <WeatherData http={http} />
//                   </>
//                 ) : (
//                   <p>No stats found for {userData.name}</p>
//                 )} */}
//               </div>
//             ) : (
//               <h5>Welcome!</h5>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AccountPage;
