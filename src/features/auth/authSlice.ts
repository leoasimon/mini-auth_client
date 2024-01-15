import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import * as authApi from "./authApi"
import { RootState } from "../../app/store"

export const authenticate = createAsyncThunk("auth/authenticate", async () => {
  const data = await authApi.authenticate()
  return data
})

export const signin = createAsyncThunk(
  "auth/signin",
  async (user: { email: string; password: string }) => {
    const data = await authApi.signin(user.email, user.password)
    return data
  },
)

type User = {
  id: string
  email: string
}

type AuthState = {
  user: User | null
  status: "idle" | "pending" | "failed"
}

const initialState: AuthState = {
  user: null,
  status: "idle",
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signout: (state) => {
      state.user = null
      localStorage.removeItem("auth_token")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.status = "pending"
      })
      .addCase(signin.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.status = "idle"
        state.user = action.payload.user
        localStorage.setItem("auth_token", action.payload.token)
      })
      .addCase(authenticate.pending, (state) => {
        state.status = "pending"
      })
      .addCase(authenticate.rejected, (state) => {
        state.status = "idle"
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.status = "idle"
        state.user = action.payload.user
      })
  },
})

export const selectUser = (state: RootState) => state.auth.user
export const selectStatus = (state: RootState) => state.auth.status

export const { signout } = authSlice.actions;

export default authSlice.reducer
