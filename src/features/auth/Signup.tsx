import { Link, useNavigate } from "react-router-dom"
import { object, ref, string } from "yup"
import { Form, Formik } from "formik"

import styles from "./Auth.module.css"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectMessage, selectStatus, signup } from "./authSlice"
import { Button } from "../../components/Button/Button"
import { TextField } from "../../components/TextField/TextField"
import { Alert } from "../../components/Alert/Alert"
import { Card } from "../../components/Card/Card"

export function SignUp() {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectStatus)
  const message = useAppSelector(selectMessage)
  const navigate = useNavigate()

  const getCharacterValidationError = (str: string) => {
    return `Your password must have at least 1 ${str} character`
  }

  const signupSchema = object({
    email: string().required("This field is required").email(),
    password: string()
      .required("This field is required")
      .min(8, "Password must have at least 8 characters")
      .matches(/[0-9]/, getCharacterValidationError("digit"))
      .matches(/[a-z]/, getCharacterValidationError("lowercase"))
      .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
    confirmPassword: string()
      .required("Please re-type your password")
      .oneOf([ref("password")], "Passwords do not match"),
  })

  type SignupData = {
    email: string,
    password: string,
    confirmPassword: string
  }

  const handleSubmit = async (value: SignupData) => {
    const result = await dispatch(signup(value))

    if (result.type === "auth/signup/fulfilled") {
      navigate("/signup-success")
    }
  }

  return (
    <div className={styles.authLayout}>
      <Card>
        <div className={styles.authBody}>
          <h1>Sign up</h1>
          <Alert type="error" visible={status === "failed"}>
            {message}
          </Alert>
          <Formik
            initialValues={{ email: "", password: "", confirmPassword: "" }}
            onSubmit={handleSubmit}
            validationSchema={signupSchema}
          >
            {({ touched, isValid }) => (
              <Form>
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <TextField
                  label="Confirm password"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                />
                <Link to="/signin">Already have an account? sign in</Link>
                <Button
                  type="submit"
                  disabled={!isValid || status === "pending" || !touched.email}
                >
                  Sign up
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Card>
    </div>
  )
}
