import React, { useState } from "react";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { auth, db } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
// import AdminManagementModal from "./AdminManagementModal";
import EditStaffStatsModal from "./EditStaffStatsModal";

const Navbar = ({ userLoggedIn, userEmail, admins, setAdmins }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  // const [showAdminManagementModal, setShowAdminManagementModal] =
  //   useState(false);
  const [showEditStaffStatsModal, setShowEditStaffModal] = useState(false);

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
    setNavbarOpen(false);
  };

  const toggleSignUpModal = () => {
    setShowSignUpModal(!showSignUpModal);
    setNavbarOpen(false);
  };

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  // const toggleAdminManagementModal = () => {
  //   setShowAdminManagementModal(!showAdminManagementModal);
  //   setNavbarOpen(false);
  // };

  const toggleEditStaffStatsModal = () => {
    setShowEditStaffModal(!showEditStaffStatsModal);
    setNavbarOpen(false);
  };

  const toggleDarkMode = () => {
    const existingLink = document.getElementById("custom-stylesheet");

    if (existingLink) {
      existingLink.parentNode.removeChild(existingLink);
    } else {
      const linkElement = document.createElement("link");
      linkElement.id = "custom-stylesheet";
      linkElement.rel = "stylesheet";
      linkElement.href = "/bootstrap.min.css";
      document.head.appendChild(linkElement);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const handleSignUp = (email, password, name) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          email: user.email,
          name: name,
        };

        const userRef = doc(db, "users", user.uid);
        setDoc(userRef, userData)
          .then(() => {
            toggleSignUpModal();
          })
          .catch((error) => {
            console.log("Sign up error:", error);
          });
      })
      .catch((error) => {
        console.log("Sign up error:", error);
      });
  };

  return (
    <nav className="navbar navbar-light bg-light navbar-expand-lg">
      {/* Logo */}
      <a href="/" className="navbar-brand" role="link">
        <img src="TPlogo.png" alt="Turf Plus Logo" />
      </a>

      {/* Navbar toggler */}
      <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navbar links */}
      <div className={`collapse navbar-collapse ${navbarOpen && "show"}`}>
        <ul className="navbar-nav ml-auto">
          {userLoggedIn && admins.includes(userEmail) && (
            <>
              {/* <li className="navbar-item">
                <a
                  className="nav-link"
                  onClick={toggleAdminManagementModal}
                  role="link"
                >
                  <i
                    role="icon"
                    className="fa-solid fa-user-pen"
                    style={{ color: "#034284" }}
                  ></i>{" "}
                  Manage Admins
                </a>
              </li> */}
              <li className="navbar-item">
                <a
                  className="nav-link"
                  onClick={toggleEditStaffStatsModal}
                  role="link"
                >
                  <i
                    role="icon"
                    className="fa-solid fa-pen"
                    style={{ color: "#034284" }}
                  ></i>{" "}
                  Edit Staff Stats
                </a>
              </li>
            </>
          )}

          {/* Login and Sign Up buttons */}
          {!userLoggedIn && (
            <>
              <li className="navbar-item">
                <a className="nav-link" onClick={toggleLoginModal} role="link">
                  <i
                    role="icon"
                    className="fa-solid fa-right-to-bracket"
                    style={{ color: "#034284" }}
                  ></i>{" "}
                  Login
                </a>
              </li>
              <li className="navbar-item">
                <a className="nav-link" onClick={toggleSignUpModal} role="link">
                  <i
                    role="icon"
                    className="fa-solid fa-user-plus"
                    style={{ color: "#034284" }}
                  ></i>{" "}
                  Sign Up
                </a>
              </li>
            </>
          )}

          {/* Logout link */}
          {userLoggedIn && (
            <li className="navbar-item">
              <a
                id="logout"
                className="nav-link"
                onClick={handleLogout}
                role="link"
              >
                <i
                  role="icon"
                  className="fa-solid fa-sign-out"
                  style={{ color: "#034284" }}
                ></i>{" "}
                Logout
              </a>
            </li>
          )}
        </ul>

        {/* Dark Mode toggle */}
        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customSwitches"
            onClick={toggleDarkMode}
          />
          <label className="custom-control-label" htmlFor="customSwitches">
            Dark Mode
          </label>
        </div>
      </div>

      {/* Login, Sign Up, and Admin Management modals */}
      {showLoginModal && (
        <LoginModal
          showModal={showLoginModal}
          toggleModal={toggleLoginModal}
          handleLogin={handleLogin}
        />
      )}
      {showSignUpModal && (
        <SignUpModal
          showModal={showSignUpModal}
          toggleModal={toggleSignUpModal}
          handleSignUp={handleSignUp}
        />
      )}
      {/* {showAdminManagementModal && (
        <AdminManagementModal
          showModal={showAdminManagementModal}
          toggleModal={toggleAdminManagementModal}
          admins={admins}
          userEmail={userEmail}
          setAdmins={setAdmins}
        />
      )} */}
      {showEditStaffStatsModal && (
        <EditStaffStatsModal
          showModal={showEditStaffStatsModal}
          toggleModal={toggleEditStaffStatsModal}
        />
      )}
    </nav>
  );
};

export default Navbar;
