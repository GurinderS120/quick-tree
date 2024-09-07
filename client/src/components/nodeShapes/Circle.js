import React from "react";
import { Handle, Position } from "@xyflow/react";

function Circle({ size }) {
  const circleStyles = {
    width: size.width,
    height: size.height,
    borderRadius: "50%",
    backgroundColor: "#eee",
    // border: "2px solid #222",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative", // For positioning the resize handle
  };

  return (
    <div style={circleStyles}>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default Circle;
