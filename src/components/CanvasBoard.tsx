// TriangleCanvas.tsx
import { useRef, useEffect, useState } from "react";

import { drawCoordinateBoard } from "../utils/DrawBoard";
import { useCanvasSize } from "../context/CanvsSizeContext";

interface CanvasBoardProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export default function CanvasBoard({canvasRef}: CanvasBoardProps) {

const { canvasHeight, canvasWidth, step } = useCanvasSize();

  
//   useEffect(() => {
//     const c = canvasRef.current?.getContext("2d");
//     if (!c) return;

//     drawCoordinateBoard(c, canvasW, canvasH, step);

//   }, [pointA, pointB, pointC]); // перемальовуємо щоразу, коли точки змінюються

  useEffect(() => {
    const c = canvasRef.current?.getContext("2d");
    if (!c){
      console.log("Canvas not found");
      return;
    }

   
    drawCoordinateBoard(c, canvasWidth, canvasHeight, step);
    console.log("Canvas drawn");

    
  }, []);

  return (
    <>
    <div className=" border-2 border-black justify-center 
    items-center align-middle mt-4 mb-4">
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      className="bg-white"
    />
    </div>
    </>
  );
}