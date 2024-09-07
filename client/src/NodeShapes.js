import CircleNode from "./components/nodeShapes/Circle.js";
import RectangleNode from "./components/nodeShapes/Rectangle.js";
import TriangleNode from "./components/nodeShapes/Triangle.js";
import HexagonNode from "./components/nodeShapes/Hexagon.js";
import DiamondNode from "./components/nodeShapes/Diamond.js";
import RoundedRectangleNode from "./components/nodeShapes/RoundedRectangle.js";

const nodeShapes = {
  circle: CircleNode,
  rectangle: RectangleNode,
  triangle: TriangleNode,
  hexagon: HexagonNode,
  diamond: DiamondNode,
  roundedRectangle: RoundedRectangleNode,
};

export default nodeShapes;
