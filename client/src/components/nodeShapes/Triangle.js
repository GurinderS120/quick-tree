import React from "react";
import { Handle, Position } from "@xyflow/react";

const triangleStyles = {
  width: 0,
  height: 0,
  borderLeft: "50px solid transparent",
  borderRight: "50px solid transparent",
  borderBottom: "100px solid #eee",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
};

const handleStyles = {
  position: "absolute",
  top: "75%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

function Triangle() {
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
