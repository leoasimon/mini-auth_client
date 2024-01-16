import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./Settings.module.css"
import { faLock } from "@fortawesome/free-solid-svg-icons"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"

export function Settings() {
  const location = useLocation()
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/settings') {
      navigate('/settings/security')
    }
  }, [location.pathname])
  return (
    <div className={styles.settings}>
      <div className={styles.settingsNav}>
        <span>Settings</span>
        <ul>
          <li className={styles.activeTab}>
            <FontAwesomeIcon icon={faLock} className={styles.sectionIcon} />
            <Link to="/settings/security">Sign in and security</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  )
}
