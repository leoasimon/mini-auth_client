import { Form, Formik } from "formik"
import { object, string } from "yup"
import { useState } from "react"

import { Card } from "../../components/Card/Card"
import { TextField } from "../../components/TextField/TextField"
import styles from "./Auth.module.css"
import { Button } from "../../components/Button/Button"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { forgotPwd, selectMessage, selectStatus } from "./authSlice"
import { Alert } from "../../components/Alert/Alert"
import * as authApi from "./authApi"

const resetPwdSchema = object({
  email: string()
    .required("this field is required")
    .email("Should be a valid email"),
})

export function ForgotPassword() {
  const status = useAppSelector(selectStatus)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (value: { email: string }) => {
    setLoading(true)
    setError(null)
    try {
      await authApi.forgotPwd(value.email)
      setSuccess(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className={styles.authLayout}>
      <Card>
        <div className={styles.authBody}>
          <h1>Reset your password</h1>
          {!loading && !success && !error ? <div>
            <Alert visible={status === "failed"} type="error">
              {error}
            </Alert>
            <Formik
              onSubmit={handleSubmit}
              initialValues={{ email: "" }}
              validationSchema={resetPwdSchema}
            >
              {({ touched, isValid }) => (
                <Form>
                  <TextField
                    label="Email adress"
                    placeholder="Email adress"
                    name="email"
                  />
                  <Button type="submit" disabled={!isValid || !touched.email}>
                    Reset password
                  </Button>
                </Form>
              )}
            </Formik>
          </div> : null }
          {loading ? <p>Loading...</p> : null}
          {success ? <Alert type="success">Success! Check your email for a reset link</Alert> : null}
          {error ? <Alert type="error">{error}</Alert> : null }
        </div>
      </Card>
    </div>
  )
}
