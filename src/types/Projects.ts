
import { IMAGES } from "../assets/images";

interface Project {
    name: string;
    description: string;
    route: string;
    image: string;
}


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