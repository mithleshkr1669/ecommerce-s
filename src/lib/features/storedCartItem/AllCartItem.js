import { createSlice } from "@reduxjs/toolkit";


let initialState= []


const allItem = createSlice({
    name: "allItem",
    initialState,
    reducers: {
        getAllItem: (state, action) => {
            
            console.log("action payload",action.payload)

            return action.payload
        }
    }
})

export const {getAllItem} = allItem.actions;
export default allItem.reducer;