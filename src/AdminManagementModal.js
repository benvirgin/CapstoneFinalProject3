// import React, { useState, useEffect } from "react";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   deleteDoc,
//   doc,
//   updateDoc,
//   arrayUnion,
//   arrayRemove,
// } from "firebase/firestore";
// import { db } from "./firebase";

// const AdminManagementModal = ({ userEmail, showModal, toggleModal }) => {
//   const [newEmail, setNewEmail] = useState("");
//   const [error, setError] = useState("");
//   const [adminEmails, setAdminEmails] = useState([]);

//   useEffect(() => {
//     const fetchAdminEmails = async () => {
//       try {
//         const adminEmailsCollection = collection(db, "admins");
//         const adminEmailsQuery = query(adminEmailsCollection);
//         const querySnapshot = await getDocs(adminEmailsQuery);
//         const emails = [];
//         querySnapshot.forEach((doc) => {
//           emails.push(doc.data().adminEmails);
//         });
//         // Flatten the emails array since it's an array of arrays
//         const flattenedEmails = [].concat(...emails);
//         setAdminEmails(flattenedEmails);
//       } catch (error) {
//         console.error("Error fetching admin emails:", error);
//       }
//     };

//     fetchAdminEmails();
//   }, []);

//   const handleAddEmail = async (e) => {
//     e.preventDefault();

//     if (adminEmails.includes(newEmail)) {
//       setError("Email is already in the allowed users list.");
//       return;
//     }

//     try {
//       // Update the existing admin emails document by adding the new email to the array
//       const adminEmailsCollection = collection(db, "admins");
//       const adminEmailsDoc = doc(adminEmailsCollection, "Oh9FTH2TRS4LQvbT5SMf");
//       await updateDoc(adminEmailsDoc, {
//         adminEmails: arrayUnion(newEmail),
//       });

//       // Update the local state
//       setAdminEmails([...adminEmails, newEmail]);
//       setNewEmail("");
//       setError("");
//     } catch (error) {
//       console.error("Error adding admin email:", error);
//       setError("Error adding the new email.");
//     }
//   }

//   const handleRemoveEmail = async (email) => {
//     if (email === userEmail) {
//       setError("Cannot delete the email of the currently logged-in user.");
//       return;
//     }

//     try {
//       const adminEmailsCollection = collection(db, "admins");
//       const adminEmailQuery = query(adminEmailsCollection, where("adminEmails", "array-contains", email));
//       const querySnapshot = await getDocs(adminEmailQuery);
//       querySnapshot.forEach((doc) => {
//         const updatedEmails = doc.data().adminEmails.filter((e) => e !== email);
//         updateDoc(doc.ref, { adminEmails: updatedEmails });
//       });

//       const updatedEmails = adminEmails.filter((e) => e !== email);
//       setAdminEmails(updatedEmails);
//     } catch (error) {
//       console.error("Error removing admin email:", error);
//     }
//   };

//   return (
//     showModal && (
//       <div className="modal" tabIndex="-1" style={{ display: "block" }}>
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header d-flex justify-content-between align-items-center">
//               <h4 className="modal-title">Manage Admins</h4>
//               <button
//                 type="button"
//                 className="btn btn-lg"
//                 onClick={toggleModal}
//                 aria-label="Close"
//               >
//                 <i
//                   className="fa-solid fa-xmark fa-xs"
//                   style={{ color: "black" }}
//                 ></i>
//               </button>
//             </div>
//             <div className="modal-body">
//               <form onSubmit={handleAddEmail}>
//                 <label htmlFor="new-admin-email" style={{ marginTop: "15px" }}>
//                   Add Email:
//                 </label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   id="new-admin-email"
//                   name="new-admin-email"
//                   required
//                   autoComplete="email"
//                   value={newEmail}
//                   onChange={(e) => setNewEmail(e.target.value)}
//                 />
//                 <button
//                   type="submit"
//                   className="btn btn-success"
//                   style={{ margin: "15px" }}
//                 >
//                   Add
//                 </button>
//                 {error && <p className="error-message">{error}</p>}
//               </form>
//               <h3>Other Admins:</h3>
//               <ul>
//                 {adminEmails.map((email) =>
//                   email !== userEmail ? (
//                     <li key={email}>
//                       {email}{" "}
//                       <button
//                         type="button"
//                         className="btn btn-lg"
//                         onClick={() => handleRemoveEmail(email)}
//                       >
//                         <i
//                           className="fa-solid fa-xmark fa-lg"
//                           style={{ color: "red" }}
//                         ></i>
//                       </button>
//                     </li>
//                   ) : null
//                 )}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default AdminManagementModal;
