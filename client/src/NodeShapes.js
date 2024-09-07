import CircleNode from "./components/nodeShapes/Circle.js";
import SquareNode from "./components/nodeShapes/Square.js";
import RectangleNode from "./components/nodeShapes/Rectangle.js";
import TriangleNode from "./components/nodeShapes/Triangle.js";
import HexagonNode from "./components/nodeShapes/Hexagon.js";
import EllipseNode from "./components/nodeShapes/Ellipse.js";
import DiamondNode from "./components/nodeShapes/Diamond.js";
import RoundedRectangleNode from "./components/nodeShapes/RoundedRectangle.js";

const nodeShapes = {
  circle: CircleNode,
  square: SquareNode,
  rectangle: RectangleNode,
  triangle: TriangleNode,
  hexagon: HexagonNode,
  ellipse: EllipseNode,
  diamond: DiamondNode,
  roundedRectangle: RoundedRectangleNode,
};

export default nodeShapes;
