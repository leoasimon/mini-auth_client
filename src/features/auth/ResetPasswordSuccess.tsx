import { useEffect } from "react"
import styles from "./Auth.module.css"
import { useNavigate } from "react-router-dom"

export function ResetPasswordSuccess() {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate('/signin')
        }, 2000)
    }, [])
  return <div className={styles.authLayout}>
    <h1>Success!</h1>
    <p>Your password has been reset. you're gonna be redirected to the signin page</p>
  </div>
}
