import React from 'react'

function NavbarComponent() {
  return (
    <div>
          <div>
      <div className="bg-transparent lg:h-[100px] h-full flex items-center flex-col lg:flex-row">
        <div className="container mx-auto flex items-center justify-between px-1 lg:flex-row flex-col gap-[10px] py-[10px]">
          <div className="flex items-center justify-center space-x-3 cursor-pointer">
           
            <span className="text-3xl  font-serif text-black">Statistic</span>
          </div>
          <div className="flex items-center justify-center space-x-3 cursor-pointer">
           
            <span className="text-3xl  font-serif text-black">New employees</span>
          </div>
          <div className="flex items-center justify-center space-x-3 cursor-pointer" >
            
            <span className="text-3xl font-serif text-black">Add Hours</span>
          </div>
          <div className="flex items-center justify-center space-x-3 cursor-pointer">
           
            <span className="text-3xl  font-serif text-black">Manage Employees</span>
          </div>
        </div>
      </div>
      
    </div>
    </div>
  )
}

export default NavbarComponent