import React from "react";

function Triangle({ size, color }) {
  const triangleStyles = {
    width: `${size.width}px`,
    height: `${size.height}px`,
    backgroundColor: color,
    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", // Creates the triangle shape
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return <div style={triangleStyles}></div>;
}

export default Triangle;
