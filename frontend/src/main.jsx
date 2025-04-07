import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {
	RouterProvider,
	createBrowserRouter,
} from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';


const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <div>error</div>,
		children: [
      {
        path: '/',
        element: <HomePage/>
    },
    ],
	},
]);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		
    <RouterProvider router={router} />
	
	</StrictMode>
);
