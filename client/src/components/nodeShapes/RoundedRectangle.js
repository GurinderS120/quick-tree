import React from "react";

function RoundedRectangle({ size }) {
  const roundedRectangleStyles = {
    width: size.width,
    height: size.height,
    backgroundColor: "#eee",
    // border: "2px solid #222",
    borderRadius: "15px", // Rounded corners
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
  };

  return <div style={roundedRectangleStyles}></div>;
}

export default RoundedRectangle;
