import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function ColorsPage() {
    const navigate = useNavigate();

    return (<>
        
        <h1>It is color page</h1>

        <button onClick={() => navigate('/')}>Go home</button>


        <Outlet/>
    
    </>);
}