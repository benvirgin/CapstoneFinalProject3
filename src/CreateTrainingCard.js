import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

const CreateTrainingCard = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleCreateTraining = async () => {
    if (title && content) {
      try {
        await addDoc(collection(db, "trainings"), {
          title: title,
          content: content,
        });

        // Reset form
        setTitle("");
        setContent("");
      } catch (error) {
        console.error("Error adding training document: ", error);
        setShowErrorMessage(true);
      }
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ border: !showForm ? "none" : "" }}>
        <div className="card-body" style={{ position: "relative" }}>
          <span className="tt" data-bs-placement="bottom" title="Add Training">
            <button
              onClick={handleToggleForm}
              style={{
                background: "none",
                border: "none",
                outline: "none",
                boxShadow: "none",
                position: "absolute",
                top: "1rem",
                left: "2.1rem",
                transform: "translate(-50%, -50%)",
                display: showForm ? "none" : "flex",
                justifyContent: "center",
                textDecoration: "none",
              }}
            >
              <i
                className={`fa-solid fa-plus fa-lg ${
                  showForm ? "collapsed" : ""
                }`}
                style={{
                  color: "#034284",
                }}
              ></i>
            </button>
          </span>
          <span className="tt" data-bs-placement="bottom" title="Cancel">
            <button
              onClick={handleToggleForm}
              style={{
                background: "none",
                border: "none",
                outline: "none",
                boxShadow: "none",
                position: "absolute",
                top: "1rem",
                left: "2.1rem",
                transform: "translate(-50%, -50%)",
                display: !showForm ? "none" : "flex",
                justifyContent: "center",
                textDecoration: "none",
              }}
            >
              <i
                className={`fa-solid fa-minus fa-lg ${
                  showForm ? "collapsed" : ""
                }`}
                style={{
                  color: "#034284",
                }}
              ></i>
            </button>
          </span>
          {showForm && (
            <>
              <form>
                <label htmlFor="title">Training Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={title}
                  onChange={handleTitleChange}
                  required
                />
                <label style={{ marginTop: "15px" }} htmlFor="content">
                  Training Content
                </label>
                <textarea
                  id="content"
                  className="form-control"
                  name="content"
                  value={content}
                  onChange={handleContentChange}
                  required
                ></textarea>
                <br />
              </form>
              <button className="btn btn-custom" onClick={handleCreateTraining}>
                Create
              </button>
              {showErrorMessage && (
                <p className="text-danger">
                  Something went wrong. Please try again.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTrainingCard;
