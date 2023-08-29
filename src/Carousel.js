import React from "react";

const Carousel = () => {

  return (
    <div className="navbar-carousel-container">
      <div className="carousel">
        <div
          id="myCarousel"
          className="carousel slide"
          data-ride="carousel"
          data-interval="2000"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="containerc">
                <i
                  className="fa-solid fa-sun fa-2x"
                  style={{ color: "#f9f001" }}
                ></i>
              </div>
            </div>
            <div className="carousel-item">
              <div className="containerc">
                <i
                  className="fa-solid fa-moon fa-2x"
                  style={{ color: "#f6f1d5" }}
                ></i>
              </div>
            </div>
            <div className="carousel-item">
              <div className="containerc">
                <i
                  className="fa-solid fa-star fa-2x"
                  style={{ color: "#ffffff" }}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;