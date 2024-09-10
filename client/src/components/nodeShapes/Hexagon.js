import React from "react";

function Hexagon({ size, color }) {
  const hexagonStyles = {
    width: size.width,
    height: size.height,
    backgroundColor: color,
    clipPath: "polygon(50% 0%, 90% 20%, 90% 80%, 50% 100%, 10% 80%, 10% 20%)", // Creates the hexagon shape
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  };

  return <div style={hexagonStyles}></div>;
}

export default Hexagon;
