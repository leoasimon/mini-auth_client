import { Route, Routes } from "react-router-dom"

import { RequireAuth } from "./features/auth/RequireAuth"
import { Counter } from "./features/counter/Counter"
import { SignIn } from "./features/auth/SignIn"
import { SignUp } from "./features/auth/Signup"
import { Settings } from "./features/settings/SettingsPage"
import { SecuritySettings } from "./features/settings/SecuritySettings"
import { VerifyEmail } from "./features/auth/VerifyEmail"
import { SignupSuccess } from "./features/auth/SignupSuccess"

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Counter />
          </RequireAuth>
        }
      />
      <Route
        path="/settings"
        element={
          <RequireAuth>
            <Settings />
          </RequireAuth>
        }
      >
        <Route path="security" element={<SecuritySettings />} />
      </Route>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/signup-success" element={<SignupSuccess />} />
    </Routes>
  )
}