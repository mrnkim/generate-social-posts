import React from "react";
import "./LoadingSpinner.css";
const loadingSpinner = require("./LoadingSpinner.svg");

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loadingSpinner">
      <div className="loadingSpinner__wrapper">
        <img
          className="loadingSpinner__img"
          src={loadingSpinner}
          alt="Loading Spinner"
        />
      </div>
    </div>
  );
}

export default LoadingSpinner;
