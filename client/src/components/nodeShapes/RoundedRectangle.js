import React from "react";
import { Handle, Position } from "@xyflow/react";

function RoundedRectangle({ size, isSelected }) {
  const roundedRectangleStyles = {
    width: size.width,
    height: size.height,
    backgroundColor: "#eee",
    // border: "2px solid #222",
    borderRadius: "15px", // Rounded corners
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
  };

  return (
    <div style={roundedRectangleStyles}>
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

export default RoundedRectangle;
