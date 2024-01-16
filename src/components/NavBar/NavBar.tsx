import { Link } from "react-router-dom"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"

import styles from "./NavBar.module.css"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectUser, signout } from "../../features/auth/authSlice"

export function NavBar() {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleSignout = () => {
    setIsMenuOpen(false);
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
          <button onClick={toggleMenu}>
            <span>{user.email}</span>
            <FontAwesomeIcon icon={isMenuOpen ? faChevronUp : faChevronDown} />
          </button>
          <div
            className={styles.dropdownMenu}
            style={{ visibility: isMenuOpen ? "visible" : "hidden" }}
          >
            <Link to="/settings/security" onClick={toggleMenu}>Settings</Link>
            <div className={styles.divider} />
            <button onClick={handleSignout}>Sign out</button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
