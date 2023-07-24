import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import { serverEndpoint } from '../../utils/serverEndpoint';
const initialState = {
  user: null,
  message: "",
  error: {},
  loading: false,
}

const signup = createAsyncThunk("user/signup", async (payload) => {
  try {
    let res = await axios.post(`${serverEndpoint}auth/signup`, { role: "user", ...payload })

    return res.data;
  } catch (err) {

    return err?.response?.data || err;
  }
})

const login = createAsyncThunk("user/login", async (payload) => {
  try {
    let res = await axios.post(`${serverEndpoint}auth/login`, payload)

    return res.data;
  } catch (err) {

    return err?.response?.data || err;
  }
})
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSignIn: (state, action) => {
      state.user = action.payload;
    },
    userSignOut: (state, action) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      const { payload } = action;
      state.message = payload.msg || payload.message;

    })
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      const { payload } = action;
      state.message = payload.msg || payload.message;
      if (payload.statusCode === 200) {
        state.user = payload.data;
      }

    })
  }
})

// Action creators are generated for each case reducer function
export const { userSignIn, userSignOut } = userSlice.actions
export {
  signup,
  login,
}

export default userSlice.reducer