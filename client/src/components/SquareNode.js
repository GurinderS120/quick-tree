import React from "react";
import { Handle, Position } from "@xyflow/react";

const squareStyles = {
  width: 100,
  height: 100,
  backgroundColor: "#eee",
  border: "2px solid #222",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

function SquareNode() {
  return (
    <div style={squareStyles}>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default SquareNode;
