import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

import * as authApi from "./authApi"
import { Alert } from "../../components/Alert/Alert"

export function CheckToken() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setIsLoading] = useState(false)

  useEffect(() => {
    authApi
      .checkUpdatePwdToken(params.get("token"))
      .then(() => {
        setSuccess(true)
      })
      .catch((e) => {
        setError(e.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    console.log(success, error)
    if (!!success) {
        navigate(`/reset-password?token=${params.get("token")}`)
    }
    if (error !== null) {
        setTimeout(() => {
            navigate("/signin")
        }, 3000)
    }
  }, [success, error])

  return <div>
    {loading && <p>Checking token...</p>}
    {error && <Alert type="error">{error}</Alert>}
  </div>
}
