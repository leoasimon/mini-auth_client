import { Link } from "react-router-dom"

import styles from "./NavBar.module.css"
import { useAppSelector } from "../../app/hooks"
import { selectUser } from "../../features/auth/authSlice"

export function NavBar() {
  const user = useAppSelector(selectUser)

  return (
    <div className={styles.navbar}>
      {user === null ? <Link to="/signin" className="signin-link">
        Sign in
      </Link> : null}
      {user === null ? <Link to="/signup" className="signup-link">
        Sign up
      </Link> : null }
    </div>
  )
}
