import { createSlice } from "@reduxjs/toolkit";

const employeesSlice = createSlice({
    name: 'employees',
    initialState:{ 
        allEmployees: [],

    },
    reducers: {
        saveInAllActions : (state, action) =>{
            state.allEmployees = action.payload;
        }
    }
})

export const {saveInAllActions} = employeesSlice.actions;
export default employeesSlice.reducer;