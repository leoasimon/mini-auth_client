import { Link, Route, Routes } from "react-router-dom"

import { Counter } from "./features/counter/Counter"
import "./App.css"
import { SignIn } from "./features/auth/SignIn"
import { RequireAuth } from "./features/auth/RequireAuth"
import { SignUp } from "./features/auth/Signup"
import { NavBar } from "./components/NavBar/NavBar"
import { useEffect } from "react"
import { useAppDispatch } from "./app/hooks"
import { authenticate } from "./features/auth/authSlice"
import { AppRoutes } from "./Routes"

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authenticate());
  })

  return (
    <div className="layout">
      <header>
        <div className="app-title">
          <Link to="/">Mini auth</Link>
        </div>
        <NavBar />
      </header>
      <div className="layoutt" />
      <main>
        <AppRoutes />
      </main>
    </div>
  )
}

export default App
