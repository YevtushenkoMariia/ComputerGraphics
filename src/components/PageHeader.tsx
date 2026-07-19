import { COLORS } from "../constants/colors";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function PageHeader({name}: {name: string}) {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }
    return (
        <header 
        style={{ backgroundColor: COLORS.darkBlue }}
        className="h-12 flex items-center justify-center fixed top-0 left-0 right-0 z-10">
          
          <div className="absolute left-4 justify-row color-white">

            <button onClick={() => handleBack()} className="flex items-center justify-center text-white"> 
                <FaArrowLeft className="text-white mr-2" /> Назад</button>
          </div>
          
          <h1 style={{ color: COLORS.white }} className="text-2xl font-bold">
            {name}</h1>
        </header>
    )
}