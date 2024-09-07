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
    width: 0,
    height: 0,
    borderLeft: `${size.width / 2}px solid transparent`,
    borderRight: `${size.width / 2}px solid transparent`,
    borderBottom: `${size.height}px solid #eee`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
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
