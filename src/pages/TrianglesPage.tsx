import { useState } from "react";
import PageHeader from "../components/PageHeader";
import TriangleLogs from "../components/TriangleLogs";
import TriangleControls from "../components/TtiangleControls";

import type { TriangleLogsProps } from "../types/Logs";
import CanvasBoard from "../components/CanvasBoard";
import { CANVAS_WIDTH, CANVAS_HEIGHT, STEP } from "../constants/Canvas";

import { useRef } from "react";
import { CleanBoard } from "../utils/DrawBoard";
import { CanvasSizeProvider } from "../context/CanvsSizeContext";
import { TrianglesProvider } from "../context/TrianglesContext";
import Triangle from "../models/Triangle";



export default function TrianglesPage() {
  const [triangleLogs, setTriangleLogs] =
    useState<TriangleLogsProps[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleLog = (newTriangleLogs: TriangleLogsProps) => {
    setTriangleLogs([...triangleLogs, newTriangleLogs]);
  };

  const handleReset = () => {
    setTriangleLogs([]);

    if (canvasRef.current) {
      const c = canvasRef.current.getContext("2d");
      if (c) {
        console.log("Cleaning board");
        CleanBoard(c, canvasRef.current.width, canvasRef.current.height, 30);
        console.log("Board cleaned");
      }
    }
  };

  const handleDraw = (triangle: Triangle) => {

    triangle.Draw(canvasRef.current?.getContext("2d")!, CANVAS_WIDTH, CANVAS_HEIGHT, STEP);
    triangle.WriteApexNames(canvasRef.current?.getContext("2d")!, CANVAS_WIDTH, CANVAS_HEIGHT, STEP);
    triangle.DrawApex(canvasRef.current?.getContext("2d")!, CANVAS_WIDTH, CANVAS_HEIGHT, STEP);

  }

  return (
    <>
      <PageHeader name="Рівносторонній трикутник" />
      <CanvasSizeProvider height={CANVAS_HEIGHT} width={CANVAS_WIDTH} step={STEP}>
        <TrianglesProvider 
        triangles={[]} 
        addTriangle={() => {}} 
        removeTriangle={() => {}} 
        updateTriangle={() => {}} 
        getTriangleCount={() => {return 0;}}>
        <div className="flex mt-12">
          <TriangleLogs triangleLogsData={triangleLogs} />

          <CanvasBoard
            canvasRef={canvasRef as React.RefObject<HTMLCanvasElement>}
          />
          <TriangleControls
            onLog={handleLog}
            onReset={handleReset}
            onDraw={handleDraw}
          />
        </div>
        </TrianglesProvider>
      </CanvasSizeProvider>
    </>
  );
}
