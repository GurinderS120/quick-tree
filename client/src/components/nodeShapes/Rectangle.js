import React from "react";

function Rectangle({ size, color }) {
  const rectangleStyles = {
    width: size.width,
    height: size.height,
    backgroundColor: color,
    // border: "2px solid #222",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
  };

  return <div style={rectangleStyles}></div>;
}

export default Rectangle;
