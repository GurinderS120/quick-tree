import React from "react";

function Diamond({ size }) {
  const diamondStyles = {
    width: size.width,
    height: size.height,
    backgroundColor: "#eee",
    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", // Diamond shape
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
  };

  return <div style={diamondStyles}></div>;
}

export default Diamond;
