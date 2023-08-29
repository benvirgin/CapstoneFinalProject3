import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

const SignUpModal = ({ showModal, toggleModal, handleSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSignUp(email, password, name);
      setEmail("");
      setPassword("");
      setName("");
      toggleModal();
      // navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    showModal && (
      <div className="modal" tabIndex="-1" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <h4 className="modal-title">Sign up</h4>
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
              <form onSubmit={handleSubmit} className="d-flex flex-column">
                <div className="mb-3">
                  <label htmlFor="signup-email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="signup-email"
                    name="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="signup-password" className="form-label">
                    Create a Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="signup-password"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="signup-name" className="form-label">
                    First and Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="signup-name"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-custom">
                    Sign up
                  </button>
                </div>
                {error && <p className="error-message text-center">{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SignUpModal;