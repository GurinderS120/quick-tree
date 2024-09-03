import React from "react";
import { Handle, Position } from "@xyflow/react";

const roundedRectangleStyles = {
  width: "150px",
  height: "75px",
  backgroundColor: "#eee",
  border: "2px solid #222",
  borderRadius: "15px", // Rounded corners
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

function RoundedRectangle() {
  return (
    <div style={roundedRectangleStyles}>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default RoundedRectangle;
