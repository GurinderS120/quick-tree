import React from "react";
import { Handle, Position } from "@xyflow/react";

function Hexagon({ size }) {
  const hexagonStyles = {
    width: size.width,
    height: size.height,
    backgroundColor: "#eee",
    clipPath: "polygon(50% 0%, 90% 20%, 90% 80%, 50% 100%, 10% 80%, 10% 20%)", // Creates the hexagon shape
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  };

  return (
    <div style={hexagonStyles}>
      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}

export default Hexagon;
