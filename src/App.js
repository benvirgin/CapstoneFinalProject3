import React, { useEffect, useState, Component } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function App() {
  const navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [admins, setAdmins] = useState([]);
  const isAdminUser = admins.includes(userEmail);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLoggedIn(true);
        setUserEmail(user.email);

        const adminsArray = [
          "benjamincvirgin@gmail.com",
          "danaandcelesta@gmail.com",
        ];
        setAdmins(adminsArray);
        const uid = user.uid;
        setTimeout(() => navigate(`/${uid}`), 0);
      } else {
        setUserLoggedIn(false);
        setUserEmail("");
        setAdmins([]);
        setTimeout(() => navigate("/"), 0);
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
        admins={admins}
        setAdmins={setAdmins}
      />
      <Routes>
        <Route
          path={`/:uid`}
          element={
            <Home
              admins={admins}
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
              admins={admins}
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