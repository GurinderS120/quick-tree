import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

import SvgIcon from "@mui/material/SvgIcon";

const shapes = [
  {
    id: "circle",
    label: "Circle",
    Icon: (props) => (
      <SvgIcon {...props}>
        <circle cx="12" cy="12" r="10" />
      </SvgIcon>
    ),
  },
  {
    id: "square",
    label: "Square",
    Icon: (props) => (
      <SvgIcon {...props}>
        <rect x="4" y="4" width="16" height="16" />
      </SvgIcon>
    ),
  },
  {
    id: "rectangle",
    label: "Rectangle",
    Icon: (props) => (
      <SvgIcon {...props}>
        <rect x="3" y="8" width="18" height="8" />
      </SvgIcon>
    ),
  },
  {
    id: "triangle",
    label: "Triangle",
    Icon: (props) => (
      <SvgIcon {...props}>
        <polygon points="12,4 20,20 4,20" />
      </SvgIcon>
    ),
  },
  {
    id: "hexagon",
    label: "Hexagon",
    Icon: (props) => (
      <SvgIcon {...props}>
        <polygon points="12,2 19,8 19,16 12,22 5,16 5,8" />
      </SvgIcon>
    ),
  },
  {
    id: "diamond",
    label: "Diamond",
    Icon: (props) => (
      <SvgIcon {...props}>
        <polygon points="12,2 22,12 12,22 2,12" />
      </SvgIcon>
    ),
  },
  {
    id: "roundedRectangle",
    label: "Rounded Rectangle",
    Icon: (props) => (
      <SvgIcon {...props}>
        <rect x="4" y="8" width="16" height="8" rx="4" ry="4" />
      </SvgIcon>
    ),
  },
  {
    id: "ellipse",
    label: "Ellipse",
    Icon: (props) => (
      <SvgIcon {...props}>
        <ellipse cx="12" cy="12" rx="10" ry="6" />
      </SvgIcon>
    ),
  },
];

function ShapeSelector() {
  const [selectedShape, setSelectedShape] = useState(shapes[0]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleIconClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleShapeClick = (shape) => {
    setSelectedShape(shape);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "shape-popover" : undefined;

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <selectedShape.Icon onClick={handleIconClick} />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div
          style={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {shapes.map((shape) => (
            <div
              key={shape.id}
              onClick={() => handleShapeClick(shape)}
              style={{
                margin: "5px 0",
                padding: "5px",
                cursor: "pointer",
                backgroundColor:
                  shape.id === selectedShape.id ? "#ddd" : "#fff",
                border:
                  shape.id === selectedShape.id
                    ? "2px solid #222"
                    : "1px solid #ccc",
                display: "flex",
                alignItems: "center",
              }}
            >
              <shape.Icon />
              <Typography variant="body1" style={{ marginLeft: "10px" }}>
                {shape.label}
              </Typography>
            </div>
          ))}
        </div>
      </Popover>
    </div>
  );
}

export default ShapeSelector;
