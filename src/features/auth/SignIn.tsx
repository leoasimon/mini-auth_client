import { Link, useLocation, useNavigate } from "react-router-dom"
import { InferType, object, string } from "yup"

import styles from "./Auth.module.css"
import { Field, Form, Formik } from "formik"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectMessage, selectStatus, selectUser, signin } from "./authSlice"
import { useEffect } from "react"
import { Button } from "../../components/Button/Button"

export function SignIn() {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectStatus)
  const message = useAppSelector(selectMessage);
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAppSelector(selectUser);

  const signinSchema = object({
    email: string().required("This field is required"),
    password: string().required("This field is required"),
  })

  type SigninData = InferType<typeof signinSchema>

  useEffect(() => {
    if (!!user) {
      navigate(location.state?.from?.pathname || "/")
    }
  }, [user])

  const handleSubmit = (value: SigninData) => {
    dispatch(signin(value))
  }

  return (
    <div className={styles.authCard}>
      <h1>Sign in</h1>
      <div className={styles.alertError} style={{
        visibility: status === 'failed' ? 'visible': 'hidden'
      }}>
        {message}
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={signinSchema}
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
  )
}
