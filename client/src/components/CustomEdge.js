import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from "@xyflow/react";

function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  selected,
}) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          {selected && (
            <IconButton
              sx={{
                width: 20,
                height: 20,
                background: "#eee",
                border: "1px solid #fff",
                cursor: "pointer",
                borderRadius: "50%",
                fontSize: 12,
                lineHeight: 1,
                "&:hover": { boxShadow: "0 0 6px 2px rgba(0, 0, 0, 0.08)" },
              }}
              onClick={onEdgeClick}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default CustomEdge;
