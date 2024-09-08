import React from "react";
import { Handle, Position } from "@xyflow/react";

function Rectangle({ size, isSelected }) {
  const rectangleStyles = {
    width: size.width,
    height: size.height,
    backgroundColor: "#eee",
    // border: "2px solid #222",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
  };

  return (
    <div style={rectangleStyles}>
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

export default Rectangle;
