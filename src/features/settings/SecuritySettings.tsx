import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectUser } from "../auth/authSlice"
import styles from "./Settings.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCheck,
  faPenToSquare,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"
import { Button } from "../../components/Button/Button"

export function SecuritySettings() {
  const user = useAppSelector(selectUser)
  const [editEmail, setEditEmail] = useState(false)

  return (
    <div className={styles.settingsSection}>
      <h2>User infos</h2>
      {!editEmail ? (
        <div className={styles.field}>
          <span className={styles.label}>Email:</span>
          <span>{user.email}</span>
          <button className={styles.fieldIconSuccess}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </div>
      ) : (
        <div className={styles.field}>
          <label htmlFor="email">Email:</label>
          <input type="text" defaultValue={user?.email} onChange={(e) => {}} />
          <button className={styles.fieldIconSuccess}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button className={styles.fieldIconCancel}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      )}
      <div className={styles.field}>
        <span className={styles.label}>Password:</span>
        <span>**********</span>
        <button className={styles.fieldIconSuccess}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </div>

      <h2>Account management</h2>
      <Button variant="danger" outlined>Delete account</Button>
    </div>
  )
}
