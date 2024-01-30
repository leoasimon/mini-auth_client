import { useState } from "react"
import { Form, Formik } from "formik"
import { object, ref, string } from "yup"
import { useNavigate, useSearchParams } from "react-router-dom"

import { Card } from "../../components/Card/Card"
import styles from "./Auth.module.css"
import { TextField } from "../../components/TextField/TextField"
import { Button } from "../../components/Button/Button"
import * as authApi from "./authApi"
import { Alert } from "../../components/Alert/Alert"

type ResetPasswordFormValues = {
  password: string
  confirmPassword: string
}

const resetPwdSchema = object({
  password: string().required("Password is required"),
  confirmPassword: string()
    .required("Confirm Password is required")
    .oneOf([ref("password"), null], "Passwords must match"),
})

export function ResetPassword() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (values: ResetPasswordFormValues) => {
    setIsLoading(true)
    setError(null)
    try {
      await authApi.resetPwd(params.get("token"), values.password)
      setError(null)
      setSuccess(true)
      redirectToLogin()
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const redirectToLogin = () => {
    setTimeout(() => {
      navigate("/signin")
    }, 2000)
  }

  return (
    <div className={styles.authLayout}>
      <Card>
        <div className={styles.authBody}>
          <h1>Reset your password</h1>
          {!error && !isLoading && !success ? (
            <div>
              <Alert visible={!!error} type="error">
                {error}
              </Alert>
              <Formik
                initialValues={{
                  password: "",
                  confirmPassword: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={resetPwdSchema}
              >
                {({ isValid, touched }) => (
                  <Form>
                    <TextField
                      label="Password"
                      name="password"
                      type="password"
                    />
                    <TextField
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                    />
                    <Button
                      type="submit"
                      disabled={!isValid || !touched.password}
                    >
                      Reset Password
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          ) : null}
          {isLoading ? <p>Loading...</p> : null}
          {success ? (
            <Alert type="success">
              Success! You will now be redirected to the signin page
            </Alert>
          ) : null}
        </div>
      </Card>
    </div>
  )
}
