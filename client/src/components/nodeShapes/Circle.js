import React from "react";
import { Handle, Position } from "@xyflow/react";

function Circle({ size, isSelected }) {
  const circleStyles = {
    width: size.width,
    height: size.height,
    borderRadius: "50%",
    backgroundColor: "#eee",
    // border: "2px solid #222",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative", // For positioning the resize handle
  };

  return (
    <div style={circleStyles}>
      <Handle
        style={{ visibility: isSelected ? "visible" : "hidden" }}
        type="source"
        position={Position.Bottom}
        id="a"
      />
      <Handle
        style={{ visibility: isSelected ? "visible" : "hidden" }}
        type="source"
        position={Position.Top}
        id="d"
      />
    </div>
  );
}

export default Circle;
