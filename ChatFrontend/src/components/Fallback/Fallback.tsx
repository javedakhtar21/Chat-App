// FallbackComponent.tsx
import React from "react";

const FallbackComponent: React.FC = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <div className="spinner-border text-primary" role="status" style={{ width: "4rem", height: "4rem" }}>
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 fs-5">Loading component...</p>
    </div>
  );
};

export default FallbackComponent;
