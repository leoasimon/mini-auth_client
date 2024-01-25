import { useState } from "react"
import { useAppSelector } from "../../app/hooks"
import { selectUser } from "../auth/authSlice"
import styles from "./Settings.module.css"
import { Button } from "../../components/Button/Button"
import { DeleteAccountModal } from "./DeleteAccountModal"

export function SecuritySettings() {
  const user = useAppSelector(selectUser)
  const [deleteAccount, setDeleteAccout] = useState(false)

  const handleDeleteAccount = () => {
    setDeleteAccout(true)
  }

  return (
    <div className={styles.settingsSection}>
      <DeleteAccountModal
        isOpen={deleteAccount}
        onClose={() => {
          setDeleteAccout(false)
        }}
      />
      <h2>User infos</h2>

      <div className={styles.field}>
        <span className={styles.label}>Email:</span>
        <span>{user.email}</span>
      </div>
      <div className={styles.field}>
        <span className={styles.label}>Password:</span>
        <span>**********</span>
      </div>

      <h2>Account management</h2>
      <Button variant="danger" outlined onClick={handleDeleteAccount}>
        Delete account
      </Button>
    </div>
  )
}
