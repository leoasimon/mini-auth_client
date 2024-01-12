import { Counter } from "./features/counter/Counter"
import "./App.css"
import { Link, Route, Routes } from "react-router-dom"
import { SignIn } from "./features/auth/SignIn"
import { RequireAuth } from "./features/auth/RequireAuth"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div className="Navbar">
          <Link className="Nav-link" to="/">
            Home
          </Link>
          <Link className="Nav-link" to="/signin">
            Sign in
          </Link>
          <Link className="Nav-link" to="/counter">
            Counter
          </Link>
        </div>
        <Routes>
          <Route
            path="/counter"
            element={
              <RequireAuth>
                <Counter />
              </RequireAuth>
            }
          />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  )
}

export default App
