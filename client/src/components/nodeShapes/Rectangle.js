import React from "react";

function Rectangle({ size }) {
  const rectangleStyles = {
    width: size.width,
    height: size.height,
    backgroundColor: "#eee",
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
