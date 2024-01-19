import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useLocation, useSearchParams } from "react-router-dom"

import styles from "./Auth.module.css"

export function VerifyEmail() {
  const location = useLocation()
  const [params] = useSearchParams()

  const [isVerified, setIsVerified] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isVerified && error === "") {
      axios
        .post("http://localhost:3000/verify-email", {
          email: params.get("email"),
          hash: params.get("hash"),
        })
        .then(() => {
          setIsVerified(true)
        })
        .catch((e) => {
          setError(e?.response?.data?.error || e.message)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [])

  return (
    <div>
      {loading ? (
        <span> Verifying your email adress...</span>
      ) : error ? (
        <div className={styles.alertError}>
          <span>{error}</span>
        </div>
      ) : (
        <div className={styles.alertSuccess}>
          <span>
            Your email adress has been successfully verified, you can now{" "}
            <Link to="/signin">sign in</Link> into your account
          </span>
        </div>
      )}
    </div>
  )
}
