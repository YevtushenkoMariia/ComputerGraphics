import type Point from "../models/Point";
import type Triangle from "../models/Triangle";

interface ColorPickerProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

interface TriangleControlsProps {
  onLog: (triangleLogs: TriangleLogsProps) => void;
  onDraw: (triangle: Triangle) => void;
  onReset: () => void;
}

interface TriangleLogsProps {
  name: string;
  apexA: Point;
  apexB: Point;
  apexC: Point;
  borderColor: string;
  fillColor: string;
  apexType: string;
}

interface PointInputProps {
    pointId: string;
    initialPoint: Point;
    onChange: (x: number, y: number) => void;
  }

export type { ColorPickerProps, TriangleControlsProps, TriangleLogsProps, PointInputProps };
