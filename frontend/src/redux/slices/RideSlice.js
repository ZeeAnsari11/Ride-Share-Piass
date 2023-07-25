import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serverEndpoint } from '../../utils/serverEndpoint';
const postRide = createAsyncThunk("postRide", async (data) => {
    try {
        let res = await axios.post(`${serverEndpoint}posts/`, data)
        return res.data;
    } catch (error) {
        return { error: error }
    }
})
const getRide = createAsyncThunk("getRide", async () => {
    try {
        let res = await axios.get(`${serverEndpoint}posts/all`)
        return res.data;
    } catch (error) {
        return { error: error }
    }
})
const initialState = {
    loading: false,
    data: [],
    error: {},
    message: ""
}
export const RideSlice = createSlice({
    name: "Rides",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(postRide.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(postRide.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.error) {
                state.error = action.payload.error;
                return
            }
            console.log(action.payload);
            state.message = "Success";
            return
        })
        builder.addCase(getRide.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getRide.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.error) {
                state.error = action.payload.error;
                return
            }
            console.log(action.payload);
            state.message = "Success";
            state.data = action.payload.data;
            return
        })
    }

})

export {
    postRide,
    getRide,
}
export default RideSlice.reducer