import { Outlet, useLocation } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarComponent from "./components/NavbarComponent";
import HomePage from "./pages/HomePage";


function App() {
  const location = useLocation();

  return (
    <>
    
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('/bgg.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-40 z-[-1]">
      </div>
       
      
       <ToastContainer/>
       {location.pathname !== '/' && <NavbarComponent />}
       <Outlet/>
    </div>
    </>
  )
}

export default App
