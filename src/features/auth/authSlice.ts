import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import * as authApi from "./authApi"
import { RootState } from "../../app/store"

export const signin = createAsyncThunk(
  "auth/signin",
  async (user: { email: string; password: string }) => {
    const response = await authApi.signin(user.email, user.password)
    return response.data
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
  reducers: {},
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
        state.user = action.payload
      })
  },
})

export const selectUser = (state: RootState) => state.auth.user
export const selectStatus = (state: RootState) => state.auth.status

export default authSlice.reducer
