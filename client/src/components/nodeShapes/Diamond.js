import React from "react";
import { Handle, Position } from "@xyflow/react";

function Diamond({ size }) {
  const diamondStyles = {
    width: size.width,
    height: size.height,
    backgroundColor: "#eee",
    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", // Diamond shape
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
  };

  return (
    <div style={diamondStyles}>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default Diamond;
