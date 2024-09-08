import React from "react";
import { Handle, Position } from "@xyflow/react";

const handleStyles = {
  position: "absolute",
  top: "75%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

function Triangle({ size }) {
  const triangleStyles = {
    width: `${size.width}px`,
    height: `${size.height}px`,
    backgroundColor: "#eee",
    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", // Creates the triangle shape
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={triangleStyles}>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyles}
      />
    </div>
  );
}

export default Triangle;
