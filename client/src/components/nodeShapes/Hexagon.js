import React from "react";
import { Handle, Position } from "@xyflow/react";

function Hexagon({ size }) {
  const width = size.width; // The width will control the overall size
  const height = width * 0.55; // Maintain the hexagon proportions (width to height ratio)

  // Main hexagon body
  const hexagonStyles = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: "#eee",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    margin: "10px 0",
  };

  // Triangular parts (top and bottom)
  const hexagonBeforeAfterStyles = {
    content: "''",
    position: "absolute",
    width: 0,
    borderLeft: `${width / 2}px solid transparent`,
    borderRight: `${width / 2}px solid transparent`,
  };

  // Top triangle
  const hexagonBeforeStyles = {
    ...hexagonBeforeAfterStyles,
    borderBottom: `${height / 2}px solid #eee`, // Adjust the height of the top triangle
    top: `-${height / 2}px`, // Move the top triangle up by half its height
  };

  // Bottom triangle
  const hexagonAfterStyles = {
    ...hexagonBeforeAfterStyles,
    borderTop: `${height / 2}px solid #eee`, // Adjust the height of the bottom triangle
    bottom: `-${height / 2}px`, // Move the bottom triangle down by half its height
  };

  return (
    <div
      style={{ position: "relative", width: `${width}px`, margin: "0 auto" }}
    >
      <div style={hexagonBeforeStyles}></div>
      <div style={hexagonStyles}>
        <Handle type="source" position={Position.Bottom} id="a" />
      </div>
      <div style={hexagonAfterStyles}></div>
    </div>
  );
}

export default Hexagon;
