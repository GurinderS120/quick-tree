import React from "react";
import { Handle, Position } from "@xyflow/react";

const diamondStyles = {
  width: "100px",
  height: "100px",
  backgroundColor: "#eee",
  border: "2px solid #222",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  transform: "rotate(45deg)", // Rotate to make a diamond shape
};

const contentStyles = {
  transform: "rotate(-45deg)", // Rotate content back to normal
};

function Diamond() {
  return (
    <div style={diamondStyles}>
      <div style={contentStyles}>
        {" "}
        {/* To keep the content upright */}
        <Handle type="source" position={Position.Bottom} id="a" />
      </div>
    </div>
  );
}

export default Diamond;
