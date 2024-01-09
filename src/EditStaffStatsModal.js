// import React, { useState, useEffect } from "react";

// const EditStaffStatsModal = ({ showModal, toggleModal }) => {
//   const [userStats, setUserStats] = useState([]);
//   const [selectedName, setSelectedName] = useState("");
//   const [selectedSC, setSelectedSC] = useState("");
//   const [selectedBonus, setSelectedBonus] = useState("");
//   const [newUser, setNewUser] = useState({
//     name: "",
//     SC: "Service Call Rate: ",
//     bonus: "Bonus per hour: ",
//   });

//   useEffect(() => {
//     fetch("http://localhost:8000/specialists")
//       .then((res) => res.json())
//       .then((data) => {
//         setUserStats(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching user stats:", error);
//       });
//   }, []);

//   const handleNameChange = (e) => {
//     const selectedUserName = e.target.value;
//     setSelectedName(selectedUserName);

//     const selectedUser = userStats.find(
//       (user) => user.name === selectedUserName
//     );
//     setSelectedSC(selectedUser ? selectedUser.SC : "");
//     setSelectedBonus(selectedUser ? selectedUser.bonus : "");
//   };

//   const handleUpdateUser = async (e) => {
//     e.preventDefault();
//     const selectedUserIndex = userStats.findIndex(
//       (user) => user.name === selectedName
//     );

//     if (selectedUserIndex !== -1) {
//       const updatedUser = {
//         ...userStats[selectedUserIndex],
//         SC: selectedSC,
//         bonus: selectedBonus,
//       };
//       setUserStats((prevStats) => [
//         ...prevStats.slice(0, selectedUserIndex),
//         updatedUser,
//         ...prevStats.slice(selectedUserIndex + 1),
//       ]);

//       try {
//         await fetch(`http://localhost:8000/specialists/${selectedUserIndex}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(updatedUser),
//         });
//       } catch (error) {
//         console.error("Error updating user:", error);
//       }
//     }
//   };

//   const handleSubmitNewUser = async (e) => {
//     e.preventDefault();
//     const newUserWithId = { ...newUser, id: userStats.length };
//     setUserStats((prevStats) => [...prevStats, newUserWithId]);

//     try {
//       await fetch("http://localhost:8000/specialists", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newUserWithId),
//       });
//     } catch (error) {
//       console.error("Error adding new user:", error);
//     }

//     setNewUser({
//       name: "",
//       SC: "Service Call Rate: ",
//       bonus: "Bonus per hour: ",
//     });
//   };

//   const handleDeleteUser = async (e) => {
//     e.preventDefault();
//     const selectedUserIndex = userStats.findIndex(
//       (user) => user.name === selectedName
//     );

//     if (selectedUserIndex !== -1) {
//       setUserStats((prevStats) => [
//         ...prevStats.slice(0, selectedUserIndex),
//         ...prevStats.slice(selectedUserIndex + 1),
//       ]);

//       try {
//         await fetch(`http://localhost:8000/specialists/${selectedUserIndex}`, {
//           method: "DELETE",
//         });
//       } catch (error) {
//         console.error("Error deleting user:", error);
//       }
//     }
//   };

//   const handleChangeNewUser = (e) => {
//     const { name, value } = e.target;
//     setNewUser((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//   };

//   return (
//     showModal && (
//       <div className="modal" tabIndex="-1" style={{ display: "block" }}>
//         <div className="modal-dialog modal-dialog-scrollable">
//           <div className="modal-content">
//             <div className="modal-header d-flex justify-content-between align-items-center">
//               <h4 className="modal-title">Edit Stats</h4>
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
//               <form onSubmit={handleUpdateUser}>
//                 <div className="form-group">
//                   <label>Select Staff Member's Name</label>
//                   <select
//                     value={selectedName}
//                     onChange={handleNameChange}
//                     className="form-control"
//                   >
//                     {userStats.map((user) => (
//                       <option key={user.id} value={user.name}>
//                         {user.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label>Staff Member's Service Call Rate</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={selectedSC}
//                     onChange={(e) => setSelectedSC(e.target.value)}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Staff Member's Bonus</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={selectedBonus}
//                     onChange={(e) => setSelectedBonus(e.target.value)}
//                   />
//                 </div>

//                 <button type="submit" className="btn btn-custom">
//                   Save Changes
//                 </button>
//               </form>

//               {/* New Staff Member Form */}
//               <form onSubmit={handleSubmitNewUser}>
//                 <div className="form-group">
//                   <label>New Staff Member's Name</label>
//                   <input
//                     type="text"
//                     id="newUserName"
//                     name="name"
//                     className="form-control"
//                     value={newUser.name}
//                     onChange={handleChangeNewUser}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>New Staff Member's Service Call Rate</label>
//                   <input
//                     type="text"
//                     id="newUserSC"
//                     name="SC"
//                     className="form-control"
//                     value={newUser.SC}
//                     onChange={handleChangeNewUser}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>New Staff Member's Bonus</label>
//                   <input
//                     type="text"
//                     id="newUserBonus"
//                     name="bonus"
//                     className="form-control"
//                     value={newUser.bonus}
//                     onChange={handleChangeNewUser}
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-custom">
//                   Add New Staff Member
//                 </button>
//               </form>

//               {/* Delete Staff Member Form */}
//               <form onSubmit={handleDeleteUser}>
//                 <div className="form-group">
//                   <label>Select Staff Member's Name to Delete</label>
//                   <select
//                     value={selectedName}
//                     onChange={handleNameChange}
//                     className="form-control"
//                   >
//                     {userStats.map((user) => (
//                       <option key={user.id} value={user.name}>
//                         {user.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <button type="submit" className="btn btn-custom">
//                   Delete Staff Member
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default EditStaffStatsModal;