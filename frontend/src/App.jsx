import { Outlet } from "react-router-dom"
import NavbarComponent from "./components/NavbarComponent"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
 

  return (
    <>
    
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('/bgg.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-40 z-[-1]">
      </div>
       <NavbarComponent/>
       
       <ToastContainer/>
       <Outlet/>
    </div>
    </>
  )
}

export default App
