import { configureStore } from '@reduxjs/toolkit';
import loaderSlice from './loaderSlice';
const store = configureStore({
	reducer: {
		loaderStore: loaderSlice,
	},
});

export default store;
