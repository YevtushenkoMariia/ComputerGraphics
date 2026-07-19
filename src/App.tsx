
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from './pages/HomePage'

import { TrianglesPage } from './pages/index'
import './index.css'



function App() {


  return (
    <>
      
      <div>
        <BrowserRouter>
          
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/triangles" element={<TrianglesPage />} />

         
      
          </Routes>
          
        </BrowserRouter>



      </div>
      
  
    
    </>
  )
}

export default App
