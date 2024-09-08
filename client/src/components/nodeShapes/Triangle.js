import React from "react";
import { Handle, Position } from "@xyflow/react";
import nodeHandleStyles from "../../nodeHandleStyles";

function Triangle({ size, isSelected }) {
  const triangleStyles = {
    width: `${size.width}px`,
    height: `${size.height}px`,
    backgroundColor: "#eee",
    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", // Creates the triangle shape
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const handleStyles = {
    ...nodeHandleStyles,
    visibility: isSelected ? "visible" : "hidden",
  };

  return (
    <div style={triangleStyles}>
      <Handle
        style={{ ...handleStyles, bottom: 3 }}
        type="source"
        position={Position.Bottom}
        id="a"
      />
      <Handle
        style={{ ...handleStyles, top: 8 }}
        type="source"
        position={Position.Top}
        id="d"
      />
    </div>
  );
}

export default Triangle;
