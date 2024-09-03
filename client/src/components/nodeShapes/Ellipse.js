import React from "react";
import { Handle, Position } from "@xyflow/react";

const ellipseStyles = {
  width: 150,
  height: 75,
  borderRadius: "50%",
  backgroundColor: "#eee",
  border: "2px solid #222",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

function Ellipse() {
  return (
    <div style={ellipseStyles}>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default Ellipse;
