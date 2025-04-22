import { createSlice } from '@reduxjs/toolkit';

const salarySlice = createSlice({
	name: 'salary',
	initialState: {
		data: [],
	},
	reducers: {
		saveSalaryActions: (state, action) => {
			state.data = action.payload;
		},
	},
});

export const { saveSalaryActions } = salarySlice.actions;
export default salarySlice.reducer;
