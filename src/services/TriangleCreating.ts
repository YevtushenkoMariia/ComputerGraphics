import Point from "../models/Point";
import Triangle from "../models/Triangle";

export function createTriangle(
  pointA: Point,
  pointB: Point,
  borderColor: string,
  fillColor: string,
  apex: string,
  isC1: boolean,
): Triangle {
  const triangle = new Triangle(pointA, pointB, borderColor, fillColor, apex);
  triangle.setIsC1(isC1);
  triangle.FindThirdApex();
  return triangle;
}
