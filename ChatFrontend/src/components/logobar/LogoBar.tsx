import React from "react";

const LogoBar: React.FC = () => {
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        textAlign: "left",
        backgroundColor: "snowwhite",
        margin: 0,
      }}
    >
      <h1
        style={{
          fontSize: "1.4rem",
          color: "#5E40F2", // Talksy teal
          margin: 0,
          fontWeight: 700,
          letterSpacing: "3px",
        }}
      >
        💬 TALKSY
      </h1>
      <p
        style={{
          fontSize: "0.9rem",
          color: "#5E40F2", // Soft gray for light theme
          fontWeight: 400,
          margin: 0,
        }}
      >
        Connect with your friends
      </p>
    </div>
  );
};

export default LogoBar;
