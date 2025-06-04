import React from "react";

const Hello = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        zIndex: 9999,
        background: "#1e90ff",
        color: "white",
        padding: "12px 20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        fontFamily: "sans-serif",
      }}
    >
      👋 Hi, I'm HasnainBot!
    </div>
  );
};

export default Hello;
