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
import CircleNode from "./components/CircleNode.js";

// register you custom nodes
const nodeTypes = {
  circle: CircleNode,
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
        <Panel position="top-left">
          <button>shapes</button>
          <button>add node</button>
        </Panel>
        <Controls>
          <ControlButton
            onClick={() => alert("Something magical just happened. ✨")}
          >
            <button>shapes</button>
          </ControlButton>
        </Controls>
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default App;
