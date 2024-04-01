import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(3);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((preVal) => --preVal);
    }, 1000);

    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });

    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <h1 className="Text-center">Redirecting You in {count} Seconds</h1>
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
};

export default Spinner;
