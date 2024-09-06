import React, { useState, useEffect, useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import SvgIcon from "@mui/material/SvgIcon";

function ResizeIcon(props) {
  return (
    <SvgIcon {...props}>
      {/* Top-left arrow */}
      <path
        d="M17 17L7 7M17 17V10M17 17H10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bottom-right arrow */}
      <path
        d="M7 7V14M7 7H14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
}

function Circle() {
  const [size, setSize] = useState({ width: 100, height: 100 });
  const [isSelected, setIsSelected] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState(null);

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

        setSize((prevSize) => ({
          width: Math.max(50, prevSize.width + deltaX), // Limit min width to 50px
          height: Math.max(50, prevSize.height + deltaY), // Limit min height to 50px
        }));

        // Update the initial mouse position to the current position after each move
        setInitialMousePosition({ x: e.clientX, y: e.clientY });
      }
    },
    [isResizing, initialMousePosition]
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
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    // Cleanup event listeners when the component is unmounted or resized stops
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  // Handle node selection when clicked
  const handleNodeClick = (e) => {
    setIsSelected(true); // Set node as selected
  };

  const circleStyles = {
    width: size.width,
    height: size.height,
    borderRadius: "50%",
    backgroundColor: "#eee",
    border: "2px solid #222",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative", // For positioning the resize handle
  };

  const selectionBoxStyles = {
    position: "absolute",
    top: -5,
    left: -5,
    width: size.width + 10,
    height: size.height + 10,
    border: "2px dashed blue",
    pointerEvents: "none", // Allow clicks to pass through the box
  };

  const resizeHandleStyles = {
    width: size.width * 0.2,
    height: size.height * 0.2,
    // backgroundColor: "black",
    position: "absolute",
    right: 0,
    bottom: 0,
    cursor: "nwse-resize",
  };

  return (
    <div style={{ position: "relative" }} onClick={handleNodeClick}>
      {/* If the node is selected, show the selection box */}
      {isSelected && <div style={selectionBoxStyles}></div>}
      {/* "nodrag" class prevents the ReactFlow from moving the node that we are trying to resize */}
      <div style={circleStyles} className={isResizing ? "nodrag" : ""}>
        <Handle type="source" position={Position.Bottom} id="a" />
        {/* Resize handle, visible when node is selected */}
        {isSelected && (
          <ResizeIcon
            style={resizeHandleStyles}
            onMouseDownCapture={handleResizeStart} // Start resizing
          />
        )}
      </div>
    </div>
  );
}

export default Circle;
