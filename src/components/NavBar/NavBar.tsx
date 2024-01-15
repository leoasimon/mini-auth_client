import { Link } from "react-router-dom"

import styles from "./NavBar.module.css"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectUser, signout } from "../../features/auth/authSlice"
import { useState } from "react"

export function NavBar() {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleSignout = () => {
    dispatch(signout())
  }

  return (
    <div className={styles.navbar}>
      {user === null ? (
        <Link to="/signin" className="signin-link">
          Sign in
        </Link>
      ) : null}
      {user === null ? (
        <Link to="/signup" className="signup-link">
          Sign up
        </Link>
      ) : null}
      {user !== null ? (
        <div className={styles.userSection}>
          <div>
            <span>{user.email}</span>
            <button onClick={toggleMenu}>...</button>
          </div>
          <div
            className={styles.dropdownMenu}
            style={{ visibility: isMenuOpen ? "visible" : "hidden" }}
          >
            <button onClick={handleSignout}>Sign out</button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
