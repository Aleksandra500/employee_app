import React, { useState } from 'react'
import AddNewEmployeeComponent from './AddNewEmployeeComponent';
import AddWorkHours from './AddWorkHours';
import ManageEmployees from './ManageEmployees';
import SalaryComponent from './SalaryComponent';

function NavbarComponent() {

  const [activeTab, setActiveTab] = useState("new employees");

  const renderComponent = () => {
    switch (activeTab) {
      case "manage employees":
        return <ManageEmployees/>;
        case "new employees":
          return <AddNewEmployeeComponent/>;
          case "addworkhours":
            return <AddWorkHours/>;
      case "salary":
        return <SalaryComponent/>;
      default: "statistic"
        return ;
    }
  };

  return (
    <div>
          <div>
      <div className="bg-transparent lg:h-[100px] h-full flex items-center flex-col lg:flex-row pt-16 ">
        <div className="container mx-auto flex items-center justify-between px-1 lg:flex-row flex-col gap-[10px] py-[10px]">
          <div className="flex items-center justify-center space-x-3 cursor-pointer  " onClick={() => setActiveTab("statistic")}>
           
            <span className="text-3xl  font-serif text-black  ">Statistic</span>
          </div>
          <div className="flex items-center justify-center space-x-3 cursor-pointer" onClick={() => setActiveTab("new employees")}>
           
            <span className="text-3xl  font-serif text-black">New employees</span>
          </div>
          <div className="flex items-center justify-center space-x-3 cursor-pointer" onClick={() => setActiveTab("manage employees")}>
            
            <span className="text-3xl font-serif text-black">Manage Employees</span>
          </div>
          <div className="flex items-center justify-center space-x-3 cursor-pointer" onClick={() => setActiveTab("addworkhours")}>
            
            <span className="text-3xl font-serif text-black">Add Work Hours</span>
          </div>
          <div className="flex items-center justify-center space-x-3 cursor-pointer" onClick={() => setActiveTab("salary")}>
           
            <span className="text-3xl  font-serif text-black">Salary</span>
          </div>
          
        </div>
      </div>
      
    </div>
    <div>{renderComponent()}</div>
    </div>
  )
}

export default NavbarComponent