import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {
	RouterProvider,
	createBrowserRouter,
} from 'react-router-dom';
import store from './store/store.js';
import HomePage from './pages/HomePage.jsx';
import { Provider } from 'react-redux';
import SinglePageSalary from './pages/SinglePageSalary.jsx';
import AddNewEmployeeComponent from './components/AddNewEmployeeComponent.jsx';
import AddWorkHours from './components/AddWorkHours.jsx';
import ManageEmployees from './components/ManageEmployees.jsx';
import SalaryComponent from './components/SalaryComponent.jsx';
import Statistic from './components/Statistic'
const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <div>error</div>,
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
			{
				path: 'employee/:employeeId',
				element: <SinglePageSalary />,
			},
			{
				path: 'addEmployee',
				element: <AddNewEmployeeComponent/>
			},
			{
				path: 'addHours',
				element: <AddWorkHours/>
			},
			{
				path: 'manage',
				element: <ManageEmployees/>
			},
			{
				path: 'salary',
				element: <SalaryComponent/>
			},
			{
				path: 'statistic',
				element: <Statistic/>
			}
		],
	},
]);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
