import React, { useState } from "react";
import _ from "lodash";

const AdminManagementModal = ({
  admins,
  setAdmins,
  userEmail,
  showModal,
  toggleModal,
}) => {
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState("");

  const handleAddEmail = (e) => {
    e.preventDefault();

    if (admins.includes(newEmail)) {
      setError("Email is already in the allowed users list.");
      return;
    }

    const updatedUsers = _.concat(admins, newEmail);
    setAdmins(updatedUsers);
    setNewEmail("");
    setError("");
  };

  const handleRemoveEmail = (email) => {
    if (email === userEmail) {
      setError("Cannot delete the email of the currently logged-in user.");
      return;
    }

    const updatedUsers = _.filter(admins, (user) => user !== email);
    setAdmins(updatedUsers);
  };

  return (
    showModal && (
      <div className="modal" tabIndex="-1" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <h4 className="modal-title">Manage Admins</h4>
              <button
                type="button"
                className="btn btn-lg"
                onClick={toggleModal}
                aria-label="Close"
              >
                <i
                  className="fa-solid fa-xmark fa-xs"
                  style={{ color: "black" }}
                ></i>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddEmail}>
                {" "}
                <label htmlFor="new-admin-email" style={{ marginTop: "15px" }}>
                  Add Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="new-admin-email"
                  name="new-admin-email"
                  required
                  autoComplete="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-success"
                  style={{ margin: "15px" }}
                >
                  Add
                </button>
                {error && <p className="error-message">{error}</p>}
              </form>
              <h3>Other Admins:</h3>
              <ul>
                {admins.map(
                  (email) =>
                    email !== userEmail && (
                      <li key={email}>
                        {email}{" "}
                        <button
                          type="button"
                          className="btn btn-lg"
                          onClick={() => handleRemoveEmail(email)}
                        >
                          <i
                            className="fa-solid fa-xmark fa-lg"
                            style={{ color: "red" }}
                          ></i>
                        </button>
                      </li>
                    )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AdminManagementModal;
