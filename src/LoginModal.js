import React, { useState } from "react";

const LoginModal = ({ showModal, toggleModal, handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    toggleModal();
  };

  return (
    showModal && (
      <div className="modal" tabIndex="-1" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <h5 className="modal-title">Login</h5>
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
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-custom">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default LoginModal;