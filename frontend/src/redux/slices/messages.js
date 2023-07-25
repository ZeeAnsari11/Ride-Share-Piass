import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    msg: null
};
const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        MessageRecieved: (state, action)=>{
            state.msg = action.payload;
        },
    }
})

export const {MessageRecieved} = messageSlice.actions;
export default messageSlice.reducer;