import { COLORS } from "../constants/colors";
import { useEffect, useState } from "react";
import type { TriangleLogsProps } from "../types/Logs";



export default function TriangleLogs
({triangleLogsData}: {triangleLogsData: TriangleLogsProps[]}){

    const [triangleLogs, setTriangleLogs] = useState<TriangleLogsProps[]>(triangleLogsData);

    useEffect(() => {
        setTriangleLogs(triangleLogsData);
    }, [triangleLogsData]);

    return (
        <div 
        style={{ borderColor: COLORS.darkBlue, backgroundColor: COLORS.white }}
        className="m-4 p-4 border-2 w-200 rounded-lg max-h-[calc(100vh-80px)]">
             <h2 className="text-xl font-bold text-center">Історія трикутників</h2>

            <div className="overflow-y-auto h-full max-h-[calc(100vh-160px)]">
            {triangleLogs && triangleLogs.map((triangleLog) => (
                <div key={triangleLog.name}
                style={{ borderColor: COLORS.darkBlue }}        >   
                <div className="w-auto h-fit items-start flex-col justify-start 
                shadow-[3px_3px_10px_rgba(73,71,179,0.3)] rounded text-xs 
                mt-2 pl-2 p-1 border-2 border-solid">
                    <h2>{triangleLog.name}</h2>
                    <p>Вершина A: 
                        <small className="text-xs text-gray-500"> ( {triangleLog.apexA.x} ; {triangleLog.apexA.y} )</small>
                    </p>
                    <p>Вершина B: 
                        <small className="text-xs text-gray-500"> ( {triangleLog.apexB.x} ; {triangleLog.apexB.y} )</small>
                    </p>
                    <p>Вершина C: 
                        <small className="text-xs text-gray-500"> ( {triangleLog.apexC.x.toFixed(2)} ; {triangleLog.apexC.y.toFixed(2)} )</small>
                    </p>
                    <p>Колір меж: 

                        <small className="text-xs text-gray-500"
                        style={{ color: triangleLog.borderColor }}> {triangleLog.borderColor}</small>
                    </p>
                    <p>Колір заливки: 
                        <small className="text-xs text-gray-500"
                        style={{ color: triangleLog.fillColor }}> {triangleLog.fillColor}</small>
                    </p>
                    <p>Тип вершини: 
                        <small className="text-xs text-gray-500"> {triangleLog.apexType}</small>
                    </p>
            </div>
            </div>
            ))}
            </div>

        </div>
    
    );
}