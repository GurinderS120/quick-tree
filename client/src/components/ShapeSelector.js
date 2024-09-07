import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import SvgIcon from "@mui/material/SvgIcon";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

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
];

function ShapeSelector({ setSelectedNode }) {
  const [selectedShape, setSelectedShape] = useState(shapes[0]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleIconClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleShapeClick = (shape) => {
    setSelectedShape(shape);
    setSelectedNode(shape);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "shape-popover" : undefined;

  return (
    <Box>
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
        <List component="nav">
          {shapes.map((shape) => (
            <React.Fragment key={shape.id}>
              <ListItem
                button="true"
                onClick={() => handleShapeClick(shape)}
                sx={(theme) => ({
                  backgroundColor:
                    shape.id === selectedShape.id
                      ? theme.palette.action.selected
                      : "inherit",
                  "&.Mui-selected:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                })}
              >
                <ListItemIcon>
                  <shape.Icon />
                </ListItemIcon>
                <ListItemText primary={shape.label} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Popover>
    </Box>
  );
}

export default ShapeSelector;
