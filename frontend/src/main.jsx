import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {
	RouterProvider,
	createBrowserRouter,
} from 'react-router-dom';
import store from './store/store.js'
import HomePage from './pages/HomePage.jsx';
import { Provider } from 'react-redux';



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
		<Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
	</StrictMode>
);
