import React, { useCallback, useRef, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ControlButton,
  MarkerType,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import Box from "@mui/material/Box";

import ShapeSelector from "./components/ShapeSelector.js";
import AbstractNode from "./components/AbstractNode.js";

const nodeTypes = { abstractNode: AbstractNode };

// We can use this object to define an edge's starting and or ending characteristics
const edgeMarker = {
  type: MarkerType.ArrowClosed,
  color: "blue",
};

const defaultEdgeOptions = { animated: false, markerEnd: edgeMarker };

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const connectingNodeId = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const reactFlowWrapper = useRef(null);

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
    console.log(nodeId);
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = `${connectingNodeId.current}-${nodes.length + 1}`;
        const newNode = {
          id: id,
          type: "abstractNode",
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: {
            label: `${connectingNodeId.current} Node`,
            nodeShape: connectingNodeId.current.split("-")[0],
          },
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id: id, source: connectingNodeId.current, target: id })
        );
      }
    },
    [setNodes, setEdges, nodes.length, screenToFlowPosition]
  );

  // adding event handlers without "useCallback" can cause infinite re-renders when
  // using reactFlow
  const onConnect = useCallback(
    (params) => {
      connectingNodeId.current = null;
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  // Handle node creation when clicking on the canvas
  const handleCanvasClick = useCallback(
    (event) => {
      if (selectedNode) {
        const newNode = {
          id: `${selectedNode.id}-${nodes.length + 1}`,
          type: "abstractNode",
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: {
            label: `${selectedNode.label} Node`,
            nodeShape: selectedNode.id,
          },
        };
        setNodes((nds) => nds.concat(newNode));
        setSelectedNode(null); // Reset after placing the node
      }
    },
    [selectedNode, screenToFlowPosition, nodes.length, setNodes]
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
      className="wrapper"
      ref={reactFlowWrapper}
    >
      <ReactFlow
        // use defaultNodes prop helped to solve the "resizeObserver" error
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        // onConnect allows us to connect nodes manually via an edge
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionMode="loose"
        defaultEdgeOptions={defaultEdgeOptions}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
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

export default function Wrapper() {
  return (
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  );
}
