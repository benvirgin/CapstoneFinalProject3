import React, { useState } from "react";
import LoginModal from "./LoginModal";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Navbar = ({ userLoggedIn }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
    setNavbarOpen(false);
  };

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
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
          {userLoggedIn && (
            <>
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
                  {/* Logout */}
                </a>
              </li>
            </>
          )}

          {!userLoggedIn && (
            <>
              <li className="navbar-item">
                <a className="nav-link" onClick={toggleLoginModal} role="link">
                  <i
                    className="fa-solid fa-pen"
                    style={{ color: "#034284" }}
                  ></i>{" "}
                  {/* Login */}
                </a>
              </li>
            </>
          )}
        </ul>

        {/* Dark Mode toggle */}
        <i className="fas fa-sun fa-lg" style={{ color: '#FDB813', margin: "8px" }}></i>
        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customSwitches"
            onClick={toggleDarkMode}
          />
          <label className="custom-control-label" htmlFor="customSwitches">
            <i className="fas fa-moon fa-lg" style={{ color: '#F6F1D5' }}></i>
          </label>
        </div>
      </div>

      {/* Modals */}
      {showLoginModal && (
        <LoginModal
          showModal={showLoginModal}
          toggleModal={toggleLoginModal}
          handleLogin={handleLogin}
        />
      )}
    </nav>
  );
};

export default Navbar;