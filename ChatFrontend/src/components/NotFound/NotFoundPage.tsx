// pages/NotFoundPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button/TButton";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center bg-light">
      <h1 className="display-1 text-danger">404</h1>
      <p className="lead">Oops! The page you are looking for does not exist.</p>
      <Button
        variant="outline"
        onClick={goHome}
      >
        Go to Homepage
      </Button>
    </div>
  );
};

export default NotFoundPage;
