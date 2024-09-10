import React from "react";

function Circle({ size, color }) {
  const circleStyles = {
    width: size.width,
    height: size.height,
    borderRadius: "50%",
    backgroundColor: color,
    // border: "2px solid #222",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative", // For positioning the resize handle
  };

  return <div style={circleStyles}></div>;
}

export default Circle;
