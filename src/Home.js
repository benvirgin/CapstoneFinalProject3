import React from "react";
import Trainings from "./Trainings";
import CreateTrainingCard from "./CreateTrainingCard";
import AccountPage from "./AccountPage";
import WeatherData from "./Weather";
import axios from "axios";
import rateLimit from "axios-rate-limit";

const Home = ({ admins, userEmail, userLoggedIn, isAdminUser }) => {

  const http = rateLimit(axios.create(), {
    maxRequests: 1,
    perMilliseconds: 1000,
  });

  return (
    <>
      {userLoggedIn ? (
        <div className="home">
          <AccountPage admins={admins} userEmail={userEmail} />
          {isAdminUser && <CreateTrainingCard />}
          <Trainings admins={admins} userEmail={userEmail} />
        </div>
      ) : (
        <div className="logoutScreen">
          <br />
          <h5>
            You're logged out.
            <br />
            Please login to view the trainings.
          </h5>
          <hr />
                    <WeatherData http={http} />
        </div>
      )}
    </>
  );
};

export default Home;