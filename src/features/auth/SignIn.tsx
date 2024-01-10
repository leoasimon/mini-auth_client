import { useState } from "react"
import { Link } from "react-router-dom"
import { InferType, object, string } from "yup"

import styles from "./Auth.module.css"
import { Field, Form, Formik } from "formik"

export function SignIn() {
  const signinSchema = object({
    email: string().required("This field is required"),
    password: string().required("This field is required"),
  })

  type SigninData = InferType<typeof signinSchema>

  const [errors, setErrors] = useState({
    email: "This field is required",
    password: "This field is required",
  })

  const handleSubmit = (value: SigninData) => {
    console.log(`Signin in with ${value.email} and ${value.password}`)
  }

  return (
    <div className={styles.authCard}>
      <h1>Sign in</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={signinSchema}
      >
        {({ isSubmitting, errors, touched, isValid }) => (
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
            <button type="submit" disabled={!isValid || isSubmitting || !touched.email}>
              Sign in
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
