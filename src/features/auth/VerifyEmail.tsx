import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

import { Alert } from "../../components/Alert/Alert"

export function VerifyEmail() {
  const [params] = useSearchParams()

  const [isVerified, setIsVerified] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const navigate = useNavigate();

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

  useEffect(() => {
    if (isVerified) {
      setTimeout(() => {
        navigate("/signin")
      }, 2000)
    }
  }, [isVerified]);

  return (
    <div>
      {loading ? (
        <span> Verifying your email adress...</span>
      ) : error ? (
        <Alert type="error">{error}</Alert>
      ) : (
        <Alert type="success">
          Your email adress has been successfully verified, you will be
          redirected to the login page
        </Alert>
      )}
    </div>
  )
}
