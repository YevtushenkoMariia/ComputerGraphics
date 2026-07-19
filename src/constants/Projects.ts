import { IMAGES } from "../assets/images";
import type { Project } from "../types/Projects";

export const projects: Project[] = [
    {
        name: "Triangles",
        description: "Triangles..",
        route: "/triangles",
        image: IMAGES.triangles,
    },
    {
        name: "Colors",
        description: "Colors..",
        route: "/colors",
        image: IMAGES.defaultImage,
    },
    {
        name: "Shapes",
        description: "Shapes..",
        route: "/shapes",
         image: IMAGES.defaultImage,
    },
    {
        name: "Test",
        description: "Test..",
        route: "/test",
        image: IMAGES.defaultImage,
    },
    
]