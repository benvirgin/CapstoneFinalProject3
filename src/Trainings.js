import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  deleteDoc,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

const embedCodeOrder = ["office", "field", "main", "quiz"];

const Trainings = ({ userEmail }) => {
  const [trainings, setTrainings] = useState([]);
  const [editableIndex, setEditableIndex] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedEmbedCodes, setUpdatedEmbedCodes] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "trainings"), (snapshot) => {
      const trainingData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTrainings(trainingData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleDelete = async (trainingId) => {
    try {
      await deleteDoc(doc(db, "trainings", trainingId));
    } catch (error) {
      console.error("Error deleting training document: ", error);
    }
  };

  const handleEdit = (index) => {
    setEditableIndex(index);
    setUpdatedTitle(trainings[index].title);
    setUpdatedEmbedCodes({ ...trainings[index].embedCodes });
  };

  const handleChangeTitle = (e) => {
    setUpdatedTitle(e.target.value);
  };

  const handleChangeEmbedCode = (field, e) => {
    setUpdatedEmbedCodes((prevCodes) => ({
      ...prevCodes,
      [field]: e.target.value,
    }));
  };

  const handleCheck = async (index) => {
    try {
      const training = trainings[index];
      const updatedTitleValue =
        updatedTitle !== "" ? updatedTitle : training.title;

      const data = {
        title: updatedTitleValue,
        embedCodes: { ...updatedEmbedCodes },
      };

      if (updatedTitleValue !== training.title) {
        const newDocRef = doc(db, "trainings", updatedTitleValue);
        await setDoc(newDocRef, data);

        if (index !== null) {
          await deleteDoc(doc(db, "trainings", training.id));
        }
      } else {
        await updateDoc(doc(db, "trainings", training.id), data);
      }

      setEditableIndex(null);
      setUpdatedTitle("");
      setUpdatedEmbedCodes({});
    } catch (error) {
      console.error("Error updating training document: ", error);
    }
  };

  const handleHeaderClick = (index) => {
    if (editableIndex === null) {
      const target = document.getElementById(`training${index + 1}`);
      if (target) {
        target.classList.toggle("show");
      }
    }
  };

  useEffect(() => {
    const target = document.getElementById(`training${editableIndex + 1}`);
    if (target) {
      if (editableIndex !== null) {
        target.classList.add("show");
      } else {
        target.classList.remove("show");
      }
    }
  }, [editableIndex]);

  return (
    <div className="trainings">
      <div className="container" id="accordion">
        {trainings.map((training, index) => {
          const isEditable = editableIndex === index;
          const isExpanded = editableIndex === index;

          return (
            <div className={`card ${isEditable ? "editable" : ""}`} key={index}>
              <div
                className={`card-header ${isEditable ? "editable-header" : ""}`}
                id={`trainingId${index + 1}`}
                onClick={() => handleHeaderClick(index)}
              >
                <span
                  className="tt"
                  data-bs-placement="bottom"
                  title="Click to expand"
                >
                  <h5 className="card-title">
                    {isEditable ? (
                      <input
                        type="text"
                        className="form-control"
                        value={updatedTitle}
                        onChange={handleChangeTitle}
                        style={{
                          background: "none",
                          border: "none",
                          outline: "none",
                          boxShadow: " none",
                          fontFamily: "inherit",
                          fontSize: "inherit",
                          fontWeight: "inherit",
                          fontStyle: "inherit",
                          letterSpacing: "inherit",
                          lineHeight: "inherit",
                          color: "inherit",
                        }}
                      />
                    ) : (
                      training.title
                    )}
                  </h5>
                </span>
                {!isEditable && userEmail && (
                  <>
                    {/* <span
                      className="tt"
                      data-bs-placement="bottom"
                      title="Edit"
                    >
                      <button
                        className="btn btn-sm"
                        onClick={() => handleEdit(index)}
                        style={{
                          position: "absolute",
                          top: "0.7rem",
                          left: "0.7rem",
                        }}
                      >
                        <i
                          className="fa-solid fa-pen fa-lg"
                          style={{ color: "#034284" }}
                        ></i>
                      </button>
                    </span> */}
                    <span
                      className="tt"
                      data-bs-placement="bottom"
                      title="Delete"
                    >
                      <button
                        className="btn btn-lg"
                        onClick={() => handleDelete(training.id)}
                        style={{
                          position: "absolute",
                          top: "0.2rem",
                          right: "0.5rem",
                        }}
                      >
                        <i
                          className="fa-solid fa-xmark fa-lg"
                          style={{ color: "#034284" }}
                        ></i>
                      </button>
                    </span>
                  </>
                )}
                {isEditable && userEmail && (
                  <span
                    className="tt"
                    data-bs-placement="bottom"
                    title="Save Changes"
                  >
                    <button
                      className="btn btn-sm"
                      onClick={() => handleCheck(index)}
                      style={{
                        position: "absolute",
                        top: "0.7rem",
                        right: "0.5rem",
                        color: "#02f232",
                      }}
                    >
                      <i
                        className="fas fa-check fa-lg"
                        style={{ color: "#034284" }}
                      ></i>
                    </button>
                  </span>
                )}
              </div>
              <div
                id={`training${index + 1}`}
                className={`collapse ${isExpanded ? "show" : ""}`}
                aria-labelledby={`trainingId${index + 1}`}
                data-parent="#accordion"
              >
                <div className="card-body" style={{ textAlign: "center" }}>
                  {isEditable ? (
                    <>
                      {embedCodeOrder.map((field) => (
                        <div key={field}>
                          <label htmlFor={`embedCode-${field}`}>
                            {field.charAt(0).toUpperCase() + field.slice(1)}:
                          </label>
                          <textarea
                            id={`embedCode-${field}`}
                            className="form-control"
                            name={`embedCode-${field}`}
                            value={updatedEmbedCodes[field] || ""}
                            onChange={(e) => handleChangeEmbedCode(field, e)}
                            style={{
                              height: `${Math.max((updatedEmbedCodes[field] || "").split('\n').length * 2, 3)}em`,
                              minHeight: "6em",
                              marginTop: "15px",
                              marginBottom: "15px",
                              resize: "none",
                              border: "none",
                            }}
                          />
                        </div>
                      ))}
                    </>
                  ) : (
                    <div>
                      <div>
                        {embedCodeOrder.map((field) => (
                          <div key={field}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: training.embedCodes[field],
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trainings;
