import React, { useState } from "react";

const Button = ({info}) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <button
      style={{
        outline: 0,
        border: 0,
        margin:"10px",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "140px",
        height: "50px",
        borderRadius: "0.5em",
        boxShadow: hovered
          ? "0 0.625em 1em 0 rgba(33, 220, 98, 0.35)"
          : "0 0.625em 1em 0 rgba(30, 143, 255, 0.35)",
        overflow: "hidden",
        transition: "0.6s cubic-bezier(.16,1,.3,1), box-shadow 0.3s ease",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          transform: hovered ? "translateY(-50px)" : "translateY(0px)",
          width: "100%",
          transition: "transform 0.6s cubic-bezier(.16,1,.3,1)",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignContent:"center",
            height: "50px",
            padding: "0.75em 1.125em",
            backgroundColor: "#1e90ff",
          }}
        >
          <p style={{ fontSize: "17px", fontWeight: "bold", color: "#ffffff" }}>
            {info.name}
          </p>
        </span>
      </div>
      <div
        style={{
          transform: hovered ? "translateY(-50px)" : "translateY(0px)",
          width: "100%",
          transition: "transform 0.6s cubic-bezier(.16,1,.3,1)",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "50px",
            padding: "0.75em 1.125em",
            backgroundColor: "#21dc62",
          }}
        >
          <p style={{ fontSize: "17px", fontWeight: "bold", color: "#ffffff" }}>
            See Details
          </p>
          <p style={{ fontSize: "17px", fontWeight: "bold", color: "#ffffff" }}>
            :D
          </p>
        </span>
      </div>
    </button>
  );
};

export default Button;
