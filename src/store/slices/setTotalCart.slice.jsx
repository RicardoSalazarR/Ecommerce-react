import { createSlice } from '@reduxjs/toolkit';

export const totalCartSlice = createSlice({
    name: 'totalCart',
    initialState: 0,
    reducers: {
        setTotalCart:(state, action)=>{
            return action.payload
        }
    }
})

export const { setTotalCart } = totalCartSlice.actions;

export default totalCartSlice.reducer;
