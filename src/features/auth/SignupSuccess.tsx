import styles from "./Auth.module.css"

export function SignupSuccess() {
  return (
    <div className={styles.authLayout}>
      <div className={styles.successCard}>
        <h3>Signup Success!</h3>
        <p>
          Your registration with Mini Auth was successful.<br/>We're
          thrilled to have you on board.<br /><br />To complete the registration process
          and gain full access to Mini Auth, please <b>check your email
          and click on the verification link.</b> If you can't find the
          email in your inbox, please check your spam or junk folder. Sometimes,
          it may end up there by mistake.
        </p>
      </div>
    </div>
  )
}
