import React, { useState } from "react";

const LoginModal = ({ showModal, toggleModal, handleLogin }) => {
  const [email, setEmail] = useState("info@turfplusutah.com");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    toggleModal();
  };

  return (
    showModal && (
      <div className="modal" tabIndex="-1" style={{ display: "block" }}>
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            {/* <button
              type="button"
              className="btn btn-lg close-button"
              onClick={toggleModal}
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark fa-xs" style={{ color: "black" }}></i>
            </button> */}
            <div className="modal-body">
              <form
                onSubmit={handleSubmit}
                className="d-flex flex-column align-items-center"
              >
                <div className="mb-3">
                  <input
                    type="hidden"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 d-flex">
                  <input
                    type="password"
                    className="form-control flex-grow-1"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn-custom">
                    <i
                      className="fas fa-check"
                      style={{ color: "#FFFFFF", margin: "9px" }}
                    ></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default LoginModal;
