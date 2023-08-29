import React from "react";
import Trainings from "./Trainings";
import CreateTrainingCard from "./CreateTrainingCard";
import AccountPage from "./AccountPage";

const Home = ({ admins, userEmail, userLoggedIn, isAdminUser }) => {

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
          <h5>
            You're logged out.
            <br />
            Please login to view the trainings.
          </h5>
        </div>
      )}
    </>
  );
};

export default Home;