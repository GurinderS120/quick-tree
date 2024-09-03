import React from "react";
import { Handle, Position } from "@xyflow/react";

const rectangleStyles = {
  width: 150,
  height: 75,
  backgroundColor: "#eee",
  border: "2px solid #222",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

function Rectangle() {
  return (
    <div style={rectangleStyles}>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default Rectangle;
