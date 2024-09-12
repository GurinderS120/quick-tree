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
  Panel,
  getNodesBounds,
  getViewportForBounds,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
} from "@xyflow/react";
import { toPng } from "html-to-image";

import "@xyflow/react/dist/style.css";

import Box from "@mui/material/Box";

import ShapeSelector from "./components/ShapeSelector.js";
import AbstractNode from "./components/AbstractNode.js";
import CustomEdge from "./components/CustomEdge.js";

const nodeTypes = { abstractNode: AbstractNode };
const edgeTypes = { customEdge: CustomEdge };

// We can use this object to define an edge's starting and or ending characteristics
const edgeMarker = {
  type: MarkerType.ArrowClosed,
  color: "blue",
};

// We use this object to define the target edge's end handle based on its source node's start handle - it is primarly used for an edge when we create a new node on edge drop
const sourceTargetHandle = {
  "bottom-handle": "top-handle",
  "right-handle": "left-handle",
  "top-handle": "top-handle",
  "left-handle": "right-handle",
};

const defaultEdgeOptions = {
  animated: false,
  markerEnd: edgeMarker,
  type: "customEdge",
};

function downloadImage(dataUrl) {
  const a = document.createElement("a");

  a.setAttribute("download", "reactflow.png");
  a.setAttribute("href", dataUrl);
  a.click();
}

const imageWidth = 1920;
const imageHeight = 1080;

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const connectingNodeId = useRef(null);
  const sourceHandleId = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const reactFlowWrapper = useRef(null);

  const { getNodes } = useReactFlow();

  const onConnectStart = useCallback((_, { nodeId, handleId }) => {
    connectingNodeId.current = nodeId;
    sourceHandleId.current = handleId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current || !sourceHandleId.current) return;

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
            id: id,
          },
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({
            id: id,
            source: connectingNodeId.current,
            target: id,
            sourceHandle: sourceHandleId.current,
            targetHandle: sourceTargetHandle[sourceHandleId.current],
          })
        );
      }
    },
    [setNodes, setEdges, nodes.length, screenToFlowPosition]
  );

  // This event handler is responsible for connecting deleted node(s)'s source with targets
  const onNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          let sourceHandle = "";
          let targetHandle = "";

          if (connectedEdges.length > 0) {
            // Need to extract the sourceHandle and targetHandle of the edge connecting current node's parent to current node, and then use them in our new edge, connecting the current node's parent node to current node's child node
            sourceHandle = connectedEdges[0]["sourceHandle"];
            targetHandle = connectedEdges[0]["targetHandle"];
          }

          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge)
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
              sourceHandle,
              targetHandle,
            }))
          );

          // console.log(createdEdges);

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges, setEdges]
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

  const handleDownloadImage = useCallback(() => {
    // we calculate a transform for the nodes so that all nodes are visible
    // we then overwrite the transform of the `.react-flow__viewport` element
    // with the style option of the html-to-image library
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2
    );

    toPng(document.querySelector(".react-flow__viewport"), {
      backgroundColor: "#ffffff",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then(downloadImage);
  }, [getNodes]);

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
            id: `${selectedNode.id}-${nodes.length + 1}`,
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
        edgeTypes={edgeTypes}
        connectionMode="loose"
        defaultEdgeOptions={defaultEdgeOptions}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        onNodesDelete={onNodesDelete}
      >
        <Panel position="top-left">
          <button className="download-btn" onClick={handleDownloadImage}>
            Download Image
          </button>
        </Panel>
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
