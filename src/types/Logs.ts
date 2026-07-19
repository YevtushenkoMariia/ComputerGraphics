import Point from "../models/Point";

interface TriangleLogsProps {
    name: string;
    apexA: Point;
    apexB: Point;
    apexC: Point;
    borderColor: string;
    fillColor: string;
    apexType: string;
}

export type { TriangleLogsProps };