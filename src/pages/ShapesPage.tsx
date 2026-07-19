import { useNavigate } from "react-router-dom"

export default function ShapesPage() {

    const navigate = useNavigate();
    return (<>
        <h1>Shapes page</h1>
        
         <button onClick={()=> navigate('/')}>Go home</button>
    
    </>)
}