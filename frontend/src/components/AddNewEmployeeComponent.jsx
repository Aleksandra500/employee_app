import { useState } from 'react';
import { toast } from 'react-toastify'; 
import { addEmployees } from '../services/addEmployeesServices';
import { useDispatch } from 'react-redux';
import { showLoaderAction } from '../store/loaderSlice';
import LoaderComponent from './Loader';


function AddNewEmployeeComponent() {
  
 const dispatch = useDispatch() 
  // State za praćenje unosa
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    position: '',
    salary: '',
  });

  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [isPositionValid, setIsPositionValid] = useState(true);
  const [isSalaryValid, setIsSalaryValid] = useState(true);

 
  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  
  const validateForm = () => {
    const { first_name, last_name, position, salary } = data;
  
    const isFirstName = !!first_name;
    const isLastName = !!last_name;
    const isPos = !!position;
    const isSal = !!salary && !isNaN(salary);
  
    setIsFirstNameValid(isFirstName);
    setIsLastNameValid(isLastName);
    setIsPositionValid(isPos);
    setIsSalaryValid(isSal);
  
    return isFirstName && isLastName && isPos && isSal;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill all the fields correctly');
      return;
    }

    dispatch(showLoaderAction(true))
    const res = await addEmployees(data)
    dispatch(showLoaderAction(false))
    if (res.status === 200) {
        toast.success(res.message)
        setData({ first_name: '', last_name: '', position: '', salary: '' });
  } else {
    toast.error(res.message);
    setData({ first_name: '', last_name: '', position: '', salary: '' });
}
  };

  return (
    <>
    {<LoaderComponent/>    }
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}>
      <div className="bg-black bg-opacity-50 p-8 rounded-lg w-full max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-white text-lg">First Name</label>
            <input 
              type="text" 
              id="first_name" 
              value={data.first_name}
              onChange={handleChange}
              className={`mt-2 p-3 w-full rounded-md border ${isFirstNameValid ? 'border-gray-300' : 'border-red-500'}`} 
              placeholder="Enter first name" 
            />
            {!isFirstNameValid && <p className="text-red-500 text-sm">First name is required</p>}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-white text-lg">Last Name</label>
            <input 
              type="text" 
              id="last_name" 
              value={data.last_name}
              onChange={handleChange}
              className={`mt-2 p-3 w-full rounded-md border ${isLastNameValid ? 'border-gray-300' : 'border-red-500'}`} 
              placeholder="Enter last name" 
            />
            {!isLastNameValid && <p className="text-red-500 text-sm">Last name is required</p>}
          </div>

          <div>
            <label htmlFor="position" className="block text-white text-lg">Position</label>
            <input 
              type="text" 
              id="position" 
              value={data.position}
              onChange={handleChange}
              className={`mt-2 p-3 w-full rounded-md border ${isPositionValid ? 'border-gray-300' : 'border-red-500'}`} 
              placeholder="Enter position" 
            />
            {!isPositionValid && <p className="text-red-500 text-sm">Position is required</p>}
          </div>

          <div>
            <label htmlFor="salary" className="block text-white text-lg">Salary</label>
            <input 
              type="number" 
              id="salary" 
              value={data.salary}
              onChange={handleChange}
              className={`mt-2 p-3 w-full rounded-md border ${isSalaryValid ? 'border-gray-300' : 'border-red-500'}`} 
              placeholder="Enter salary" 
            />
            {!isSalaryValid && <p className="text-red-500 text-sm">Please enter a valid salary</p>}
          </div>

          <button 
            type="submit" 
            className="w-full mt-4 py-2 bg-blue-600 text-white font-semibold rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default AddNewEmployeeComponent;
