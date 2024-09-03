import React from "react";
import { Handle, Position } from "@xyflow/react";

const circleStyles = {
  width: 100,
  height: 100,
  borderRadius: "50%",
  backgroundColor: "#eee",
  border: "2px solid #222",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

function CircleNode() {
  return (
    <div style={circleStyles}>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default CircleNode;
