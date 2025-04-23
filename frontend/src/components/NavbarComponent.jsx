import React from 'react'
import { Link } from 'react-router-dom';

function NavbarComponent() {
  return (
    <div className="bg-transparent lg:h-[100px] h-full flex items-center flex-col lg:flex-row pt-16">
      <div className="container mx-auto flex items-center justify-between px-1 lg:flex-row flex-col gap-[10px] py-[10px]">

        <Link to="/statistic">
          <span className="text-3xl font-serif text-black cursor-pointer">Statistic</span>
        </Link>

        <Link to="/addEmployee">
          <span className="text-3xl font-serif text-black cursor-pointer">New employees</span>
        </Link>

        <Link to="/manage">
          <span className="text-3xl font-serif text-black cursor-pointer">Manage Employees</span>
        </Link>

        <Link to="/addHours">
          <span className="text-3xl font-serif text-black cursor-pointer">Add Work Hours</span>
        </Link>

        <Link to="/salary">
          <span className="text-3xl font-serif text-black cursor-pointer">Salary</span>
        </Link>

      </div>
    </div>
  );
}

export default NavbarComponent;
