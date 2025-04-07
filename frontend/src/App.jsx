import { Outlet } from "react-router-dom"
import NavbarComponent from "./components/NavbarComponent"





function App() {
 

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('/bgg.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-40 z-[-1]">
      </div>
       <NavbarComponent/>
       
       <Outlet/>
    </div>
  )
}

export default App
