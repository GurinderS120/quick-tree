import React from "react";
import { Handle, Position } from "@xyflow/react";

const contentStyles = {
  transform: "rotate(-45deg)", // Rotate content back to normal
};

function Diamond({ size }) {
  const diamondStyles = {
    width: size.width,
    height: size.height,
    backgroundColor: "#eee",
    // border: "2px solid #222",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    transform: "rotate(45deg)", // Rotate to make a diamond shape
  };

  return (
    <div style={diamondStyles}>
      <div style={contentStyles}>
        {/* To keep the content upright */}
        <Handle type="source" position={Position.Bottom} id="a" />
      </div>
    </div>
  );
}

export default Diamond;
