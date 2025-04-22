import { configureStore } from '@reduxjs/toolkit';
import loaderSlice from './loaderSlice';
import employeesSlice from './employeesSlice';
import salarySlice from './salarySlice';

const store = configureStore({
	reducer: {
		loaderStore: loaderSlice,
		employeesStore: employeesSlice,
		salaryStore: salarySlice,
	},
});

export default store;
