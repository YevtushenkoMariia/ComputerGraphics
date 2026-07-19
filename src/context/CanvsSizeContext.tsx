// context/CanvasSizeContext.tsx
import { createContext, useContext, type ReactNode } from "react";

interface CanvasSizeContextType {
  canvasWidth: number;
  canvasHeight: number;
  step: number;
}

const CanvasSizeContext = createContext<CanvasSizeContextType | undefined>(
  undefined,
);

export function CanvasSizeProvider({
  width,
  height,
  step,
  children,
}: {
  width: number;
  height: number;
  step: number;
  children: ReactNode;
}) {
  return (
    <CanvasSizeContext.Provider
      value={
        { canvasWidth: width, 
            canvasHeight: height, 
            step: step 
        }}
    >
      {children}
    </CanvasSizeContext.Provider>
  );
}

export function useCanvasSize() {
  const context = useContext(CanvasSizeContext);
  if (!context)
    throw new Error("useCanvasSize must be used within CanvasSizeProvider");
  return context;
}
