import React from "react";
import { Handle, Position } from "@xyflow/react";

const hexagonStyles = {
  width: "100px",
  height: "55px",
  backgroundColor: "#eee",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  margin: "10px 0",
};

const hexagonBeforeAfterStyles = {
  content: "''",
  position: "absolute",
  width: 0,
  borderLeft: "50px solid transparent",
  borderRight: "50px solid transparent",
};

const hexagonBeforeStyles = {
  ...hexagonBeforeAfterStyles,
  borderBottom: "27.5px solid #eee",
  top: "-27.5px",
};

const hexagonAfterStyles = {
  ...hexagonBeforeAfterStyles,
  borderTop: "27.5px solid #eee",
  bottom: "-27.5px",
};

function Hexagon() {
  return (
    <div style={{ position: "relative", width: "100px", margin: "0 auto" }}>
      <div style={hexagonBeforeStyles}></div>
      <div style={{ ...hexagonStyles, border: "2px solid #222" }}>
        <Handle type="source" position={Position.Bottom} id="a" />
      </div>
      <div style={hexagonAfterStyles}></div>
    </div>
  );
}

export default Hexagon;
