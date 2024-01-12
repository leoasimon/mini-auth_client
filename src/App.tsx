import { Link, Route, Routes } from "react-router-dom"

import { Counter } from "./features/counter/Counter"
import "./App.css"
import { SignIn } from "./features/auth/SignIn"
import { RequireAuth } from "./features/auth/RequireAuth"
import { SignUp } from "./features/auth/Signup"

function App() {
  return (
    <div>
      <header>
        <div className="app-title">
          <Link to="/">Mini auth</Link>
        </div>
        <div className="navbar">
          <Link to="/signin" className="signin-link">
            Sign in
          </Link>
          <Link to="/signup" className="signup-link">
            Sign up
          </Link>
        </div>
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Counter />
              </RequireAuth>
            }
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
