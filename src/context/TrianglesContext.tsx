

import { createContext, useContext, type ReactNode } from "react";
import Triangle from "../models/Triangle";


interface TrianglesContextType {
    triangles: Triangle[];
    addTriangle: (triangle: Triangle) => void;
    removeTriangle: (triangle: Triangle) => void;
    updateTriangle: (triangle: Triangle) => void;
   
    getTriangleCount: () => number;
}

const TrianglesContext = 
createContext<TrianglesContextType | undefined>(undefined);

export function TrianglesProvider(
    { children ,
        triangles,
        addTriangle,
        removeTriangle,
        updateTriangle,
       
        getTriangleCount,
    }: { children: ReactNode,
        triangles: Triangle[],
        addTriangle: (triangle: Triangle) => void;
        removeTriangle: (triangle: Triangle) => void;
        updateTriangle: (triangle: Triangle) => void;
      
        getTriangleCount: () => number;
    }) {
        return (
            <TrianglesContext.Provider 
            value={{ 
                triangles, 
                addTriangle, 
                removeTriangle, 
                updateTriangle, 
                getTriangleCount }}>
                {children}
            </TrianglesContext.Provider>
        );
    }
       
    export function useTriangles() {
        const context = useContext(TrianglesContext);
        if (!context) {
            throw new Error("useTriangles must be used within a TrianglesProvider");
        }
        return context;
    }
    