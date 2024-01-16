import { Link, useLocation, useNavigate } from "react-router-dom"
import { InferType, object, ref, string } from "yup"

import styles from "./Auth.module.css"
import { Field, Form, Formik } from "formik"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectMessage, selectStatus, selectUser, signup } from "./authSlice"
import { useEffect } from "react"
import { Button } from "../../components/Button/Button"

export function SignUp() {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectStatus)
  const message = useAppSelector(selectMessage)
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()
  const location = useLocation()

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

  type SignupData = InferType<typeof signupSchema>

  useEffect(() => {
    if (!!user) {
      navigate(location.state?.from?.pathname || "/")
    }
  }, [user])

  const handleSubmit = (value: SignupData) => {
    dispatch(signup(value))
  }

  return (
    <div className={styles.authCard}>
      <h1>Sign up</h1>
      <div
        className={styles.alertError}
        style={{
          visibility: status === "failed" ? "visible" : "hidden",
        }}
      >
        {message}
      </div>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        onSubmit={handleSubmit}
        validationSchema={signupSchema}
      >
        {({ errors, touched, isValid }) => (
          <Form>
            <div className={styles.textfield}>
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                name="email"
                className={styles.textfield}
                placeholder="Email"
              />
              <span>{touched.email && errors.email ? errors.email : ""}</span>
            </div>
            <div className={styles.textfield}>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" placeholder="Password" />
              <span>
                {errors.password && touched.password ? errors.password : ""}
              </span>
            </div>
            <div className={styles.textfield}>
              <label htmlFor="password">Confirm password</label>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
              />
              <span>
                {errors.confirmPassword && touched.confirmPassword
                  ? errors.confirmPassword
                  : ""}
              </span>
            </div>
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
  )
}
