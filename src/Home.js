import React from "react";
import Trainings from "./Trainings";
import CreateTrainingCard from "./CreateTrainingCard";
import AccountPage from "./AccountPage";
import WeatherData from "./Weather";
import axios from "axios";
import rateLimit from "axios-rate-limit";

const Home = ({ userEmail, userLoggedIn, isAdminUser }) => {
  const http = rateLimit(axios.create(), {
    maxRequests: 1,
    perMilliseconds: 1000,
  });

  return (
    <>
      {userLoggedIn ? (
        <div className="home">
          <AccountPage userEmail={userEmail} />
          {isAdminUser && (
            <CreateTrainingCard cardOrder={[]} setCardOrder={() => {}} />
          )}
          <Trainings userEmail={userEmail} isAdminUser={isAdminUser} />
        </div>
      ) : (
        <div className="logoutScreen">
          <br />
          <h5>Login to view your stats.</h5>
          <hr />
          <WeatherData http={http} />
          <Trainings userEmail={userEmail} isAdminUser={isAdminUser} />
        </div>
      )}
    </>
  );
};

export default Home;
