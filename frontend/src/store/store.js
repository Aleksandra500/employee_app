import { configureStore } from '@reduxjs/toolkit';
import loaderSlice from './loaderSlice';
import employeesSlice from './employeesSlice';
const store = configureStore({
	reducer: {
		loaderStore: loaderSlice,
		employeesStore: employeesSlice,
	},
});

export default store;
