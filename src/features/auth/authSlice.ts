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
    const data = await authApi.signin(user.email.toLowerCase(), user.password)
    return data
  },
)

export const signup = createAsyncThunk(
  "auth/signup",
  async (user: { email: string; password: string }) => {
    const data = await authApi.signup(user.email.toLowerCase(), user.password)
    return data
  },
)

export const editInfos = createAsyncThunk(
  "auth/editInfos",
  async (changes: Partial<User>) => {
    const data = await authApi.editInfos(changes)
    return data
  },
)

export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async (password: string) => {
    const data = await authApi.deleteAccount(password)
    return data
  },
)

export const forgotPwd = createAsyncThunk(
  "auth/resetPwd",
  async (email: string) => {
    const data = await authApi.forgotPwd(email)
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
  message: string
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  message: "",
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
      .addCase(signup.pending, (state) => {
        state.status = "pending"
        state.message = ""
      })
      .addCase(signup.rejected, (state, action) => {
        ;(state.status = "failed"), (state.message = action.error.message || "")
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "idle"
      })
      .addCase(signin.pending, (state) => {
        state.status = "pending"
        state.message = ""
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = "failed"
        state.message = action.error.message || ""
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
      .addCase(editInfos.pending, (state) => {
        state.status = "pending"
      })
      .addCase(editInfos.rejected, (state, action) => {
        state.status = "failed"
        state.message = action.error.message || ""
      })
      .addCase(editInfos.fulfilled, (state, action) => {
        ;(state.status = "idle"), (state.user = action.payload.user)
      })
      .addCase(deleteAccount.pending, (state) => {
        state.status = "pending"
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.status = "idle"
        state.message = action.error.message || ""
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.status = "pending"
        state.user = null
        localStorage.removeItem("auth_token")
      })
      .addCase(forgotPwd.pending, (state) => {
        state.status = "pending"
      })
      .addCase(forgotPwd.rejected, (state, action) => {
        state.status = "failed"
        state.message = action.error.message || ""
      })
      .addCase(forgotPwd.fulfilled, (state) => {
        state.status = "idle"
      })

  },
})

export const selectUser = (state: RootState) => state.auth.user
export const selectStatus = (state: RootState) => state.auth.status
export const selectMessage = (state: RootState) => state.auth.message

export const { signout } = authSlice.actions

export default authSlice.reducer
