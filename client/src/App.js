import React, { useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  ControlButton,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

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

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
  {
    id: "3",
    position: { x: 50, y: 100 },
    data: { label: "circle" },
    type: "circle",
  },
  {
    id: "4",
    position: { x: 150, y: 100 },
    data: { label: "square" },
    type: "square",
  },
  {
    id: "5",
    position: { x: 200, y: 100 },
    data: { label: "rectangle" },
    type: "rectangle",
  },
  {
    id: "6",
    position: { x: 250, y: 100 },
    data: { label: "triangle" },
    type: "triangle",
  },
  {
    id: "7",
    position: { x: 300, y: 100 },
    data: { label: "hexagon" },
    type: "hexagon",
  },
  {
    id: "8",
    position: { x: 350, y: 100 },
    data: { label: "ellipse" },
    type: "ellipse",
  },
  {
    id: "9",
    position: { x: 400, y: 100 },
    data: { label: "diamond" },
    type: "diamond",
  },
  {
    id: "10",
    position: { x: 450, y: 100 },
    data: { label: "roundedRectangle" },
    type: "roundedRectangle",
  },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];
const defaultEdgeOptions = { animated: true };

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {/* Move ShapeSelector outside ReactFlow temporarily to test */}
      {/* <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <ShapeSelector />
      </div> */}
      <ReactFlow
        // nodes={nodes}
        // edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        // onConnect allows us to connect nodes manually via an edge
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
      >
        <Controls position="bottom-left">
          <ControlButton>
            <ShapeSelector />
          </ControlButton>
        </Controls>
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default App;
