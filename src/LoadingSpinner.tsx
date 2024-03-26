import React from "react";
// @ts-ignore
import loadingSpinner from "./LoadingSpinner.svg";
import "./LoadingSpinner.css";

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
