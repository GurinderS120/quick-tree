import React from "react";
import { Handle, Position } from "@xyflow/react";

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
  };

  return (
    <div style={rectangleStyles}>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default Rectangle;
