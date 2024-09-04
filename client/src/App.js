import React, { useCallback, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ControlButton,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import Box from "@mui/material/Box";

import CircleNode from "./components/nodeShapes/Circle.js";
import SquareNode from "./components/nodeShapes/Square.js";
import RectangleNode from "./components/nodeShapes/Rectangle.js";
import TriangleNode from "./components/nodeShapes/Triangle.js";
import HexagonNode from "./components/nodeShapes/Hexagon.js";
import EllipseNode from "./components/nodeShapes/Ellipse.js";
import DiamondNode from "./components/nodeShapes/Diamond.js";
import RoundedRectangleNode from "./components/nodeShapes/RoundedRectangle.js";

import ShapeSelector from "./components/ShapeSelector.js";

// register you custom nodes
const nodeTypes = {
  circle: CircleNode,
  square: SquareNode,
  rectangle: RectangleNode,
  triangle: TriangleNode,
  hexagon: HexagonNode,
  ellipse: EllipseNode,
  diamond: DiamondNode,
  roundedRectangle: RoundedRectangleNode,
};

const defaultEdgeOptions = { animated: true };

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Handle node creation when clicking on the canvas
  const handleCanvasClick = useCallback(
    (event) => {
      if (selectedNode) {
        const newNode = {
          id: `${selectedNode.id}-${nodes.length + 1}`,
          type: selectedNode.id,
          position: {
            x: cursorPosition.x,
            y: cursorPosition.y,
          },
          data: { label: `${selectedNode.label} Node` },
        };
        setNodes((nds) => nds.concat(newNode));
        setSelectedNode(null); // Reset after placing the node
      }
    },
    [selectedNode, cursorPosition, nodes.length, setNodes]
  );

  const handleMouseMove = useCallback((event) => {
    setCursorPosition({
      x: event.clientX,
      y: event.clientY,
    });
  }, []);

  // Handle right-click to cancel node placement
  const handleRightClick = useCallback((event) => {
    event.preventDefault(); // Prevent the default context menu
    setSelectedNode(null); // Cancel the current shape placement
  }, []);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
      onMouseMove={handleMouseMove}
      onClick={handleCanvasClick}
      onContextMenu={handleRightClick} // Handle right-click
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        // onConnect allows us to connect nodes manually via an edge
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
      >
        <Controls position="bottom-left">
          <ControlButton>
            <ShapeSelector setSelectedNode={setSelectedNode} />
          </ControlButton>
        </Controls>
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>

      {selectedNode && (
        <Box
          sx={{
            position: "absolute",
            left: cursorPosition.x,
            top: cursorPosition.y,
            pointerEvents: "none", // Prevent blocking other mouse events
            transform: "translate(-50%, -50%)",
          }}
        >
          <selectedNode.Icon
            sx={{ fontSize: "40px", color: "rgba(0, 0, 0, 0.5)" }}
          />
        </Box>
      )}
    </Box>
  );
}

export default App;
