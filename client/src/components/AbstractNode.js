import React, { useState, useEffect, useCallback, useRef } from "react";
import nodeShapes from "../nodeShapes.js";
import { Handle, Position, NodeToolbar } from "@xyflow/react";
import { Toolbar, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  iconButton: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    margin: "5px",
  },
});

const nodeColors = [
  "rgb(207, 76, 44)",
  "rgb(234, 156, 65)",
  "rgb(235, 195, 71)",
  "rgb(67, 141, 87)",
  "rgb(63, 138, 226)",
  "rgb(128, 61, 236)",
];

// We use this array to keep track of shapes whose widths and heights must maintain an aspect ratio
const restrictiveShapes = [];

function topSelectionBoxStyle(shape, size) {
  if (shape === "diamond") {
    return -5;
  } else {
    return -5;
  }
}

function leftSelectionBoxStyle(shape, size) {
  if (shape === "diamond") {
    return -5;
  } else {
    return -5;
  }
}

function widthSelectionBoxStyle(shape, size) {
  if (shape === "diamond") {
    return size.width + 10;
  } else {
    return size.width + 10;
  }
}

function heightSelectionBoxStyle(shape, size) {
  if (shape === "diamond") {
    return size.height + 10;
  } else {
    return size.height + 10;
  }
}

// ReactFlow passes the data object as a prop
function AbstractNode({ data }) {
  const [size, setSize] = useState({ width: 100, height: 100 });
  const [isSelected, setIsSelected] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState(null);
  const [color, setColor] = useState("rgb(207, 76, 44)");
  const nodeRef = useRef(null);

  const classes = useStyles();

  const SelectedNode = nodeShapes[data["nodeShape"]];

  // Handle the start of resizing (when the user clicks on the resize handle)
  const handleResizeStart = (e) => {
    setIsResizing(true);
    setInitialMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Handle the mouse move event during resizing
  const handleMouseMove = useCallback(
    (e) => {
      if (isResizing && initialMousePosition) {
        const deltaX = e.clientX - initialMousePosition.x;
        const deltaY = e.clientY - initialMousePosition.y;

        if (restrictiveShapes.includes(data["nodeShape"])) {
          // Calculate the maximum change in both directions to maintain the aspect ratio
          const delta = Math.max(deltaX, deltaY);

          setSize((prevSize) => ({
            width: Math.max(50, prevSize.width + delta), // Limit min size to 50px
            height: Math.max(50, prevSize.height + delta), // Keep the height equal to width
          }));
        } else {
          setSize((prevSize) => ({
            width: Math.max(50, prevSize.width + deltaX), // Limit min width to 50px
            height: Math.max(50, prevSize.height + deltaY), // Limit min height to 50px
          }));
        }

        // Update the initial mouse position to the current position after each move
        setInitialMousePosition({ x: e.clientX, y: e.clientY });
      }
    },
    [isResizing, initialMousePosition, data]
  );

  // Handle mouse up (stops resizing)
  const handleMouseUp = useCallback(() => {
    if (isResizing) {
      setIsResizing(false); // Stop resizing when the mouse button is released
    }
  }, [isResizing]);

  // Add/remove event listeners for mousemove and mouseup
  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    // Cleanup event listeners when the component is unmounted or resized stops
    return () => {
      if (isResizing) {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  // Detect clicks outside of the node to unselect it
  const handleClickOutside = useCallback(
    (event) => {
      if (nodeRef.current && !nodeRef.current.contains(event.target)) {
        setIsSelected(false); // Deselect the node when clicking outside
      }
    },
    [nodeRef]
  );

  // Add/remove event listeners for mousedown, which is used to check if a user clicked outside the selected node - for now this only works if a user uses right-mouse click, since ReactFlow interally uses the left-mouse click
  useEffect(() => {
    if (isSelected) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      if (isSelected) {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [isSelected, handleClickOutside]);

  // Handle node selection when clicked
  const handleNodeClick = (e) => {
    setIsSelected(true); // Set node as selected
  };

  const selectionBoxStyles = {
    position: "absolute",
    top: topSelectionBoxStyle(data["nodeShape"], size),
    left: leftSelectionBoxStyle(data["nodeShape"], size),
    width: widthSelectionBoxStyle(data["nodeShape"], size),
    height: heightSelectionBoxStyle(data["nodeShape"], size),
    border: "2px dashed blue",
    cursor: "pointer",
    visibility: isSelected ? "visible" : "hidden",
  };

  return (
    <div
      style={{ position: "relative" }}
      ref={nodeRef}
      onClick={handleNodeClick}
      // "nodrag" class prevents the ReactFlow from moving the node that we are trying to resize
      className={isResizing ? "nodrag" : ""}
    >
      {/* If the node is selected, show the selection box */}
      <NodeToolbar position={Position.Top} offset={13}>
        <Toolbar sx={{ backgroundColor: "#1e293b", borderRadius: "15px" }}>
          {nodeColors.map((nodeColor) => (
            <IconButton
              key={nodeColor}
              className={classes.iconButton}
              sx={{
                backgroundColor: nodeColor,
                "&:hover": { backgroundColor: nodeColor },
                border: nodeColor === color ? "3px solid white" : "none",
                boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
              }}
              onClick={() => setColor(nodeColor)}
            />
          ))}
        </Toolbar>
      </NodeToolbar>
      <div style={selectionBoxStyles} onMouseDownCapture={handleResizeStart}>
        <Handle
          onMouseDown={() => setIsResizing(false)}
          type="source"
          position={Position.Bottom}
          id="bottom-handle"
        />
        <Handle
          onMouseDown={() => setIsResizing(false)}
          type="source"
          position={Position.Top}
          id="top-handle"
        />
        <Handle
          onMouseDown={() => setIsResizing(false)}
          type="source"
          position={Position.Left}
          id="left-handle"
        />
        <Handle
          onMouseDown={() => setIsResizing(false)}
          type="source"
          position={Position.Right}
          id="right-handle"
        />
      </div>
      <SelectedNode size={size} color={color} />
    </div>
  );
}

export default AbstractNode;
