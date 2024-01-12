import { Link, Route, Routes } from "react-router-dom"

import { Counter } from "./features/counter/Counter"
import "./App.css"
import { SignIn } from "./features/auth/SignIn"
import { RequireAuth } from "./features/auth/RequireAuth"
import { SignUp } from "./features/auth/Signup"
import { NavBar } from "./components/NavBar/NavBar"

function App() {
  return (
    <div>
      <header>
        <div className="app-title">
          <Link to="/">Mini auth</Link>
        </div>
        <NavBar />
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
