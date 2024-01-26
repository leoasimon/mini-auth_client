import { useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { object, string } from "yup"

import styles from "./Auth.module.css"
import { Form, Formik } from "formik"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectMessage, selectStatus, selectUser, signin } from "./authSlice"
import { Button } from "../../components/Button/Button"
import { TextField } from "../../components/TextField/TextField"
import { Alert } from "../../components/Alert/Alert"
import { Card } from "../../components/Card/Card"

export function SignIn() {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectStatus)
  const message = useAppSelector(selectMessage)
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAppSelector(selectUser)

  const signinSchema = object({
    email: string().required("This field is required"),
    password: string().required("This field is required"),
  })

  type SigninData = {
    email: string
    password: string
  }

  useEffect(() => {
    if (!!user) {
      navigate(location.state?.from?.pathname || "/")
    }
  }, [user])

  const handleSubmit = (value: SigninData) => {
    dispatch(signin(value))
  }

  return (
    <div className={styles.authLayout}>
      <Card>
        <div className={styles.authBody}>
          <h1>Sign in</h1>
          <Alert visible={status === "failed"} type="error">
            {message}
          </Alert>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={signinSchema}
          >
            {({ touched, isValid }) => (
              <Form>
                <TextField type="email" name="email" placeholder="Email" />
                <TextField
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <Link to="/forgot-password">Forgot password?</Link>
                <Button
                  type="submit"
                  disabled={!isValid || status === "pending" || !touched.email}
                >
                  Sign in
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Card>
    </div>
  )
}
