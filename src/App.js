import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useNavigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";
import { auth } from "./firebase";

function App() {
  const navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(true);
        setUserEmail(user.email);

        // Check if the user's email is in the "admins" collection
        const db = getFirestore();
        const adminsCollection = collection(db, "admins");
        const q = query(
          adminsCollection,
          where("adminEmails", "array-contains", user.email)
        );

        getDocs(q)
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              // The user is an admin
              setIsAdminUser(true);
            } else {
            }
          })
          .catch((error) => {
            console.error("Error checking admin status:", error);
          });

        const uid = user.uid;
        setTimeout(() => {
          navigate(`/${uid}`);
        }, 0);
      } else {
        setUserLoggedIn(false);
        setUserEmail("");
        setIsAdminUser(false);
        setTimeout(() => {
          navigate("/");
        }, 0);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="App">
      <Navbar
        userLoggedIn={userLoggedIn}
        userEmail={userEmail}
        isAdminUser={isAdminUser}
      />
      <Routes>
        <Route
          path={`/:uid`}
          element={
            <Home
              userEmail={userEmail}
              userLoggedIn={userLoggedIn}
              isAdminUser={isAdminUser}
            />
          }
        />
        <Route
          path="/"
          element={
            <Home
              userEmail={userEmail}
              userLoggedIn={userLoggedIn}
              isAdminUser={isAdminUser}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
