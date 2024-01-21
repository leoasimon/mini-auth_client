import { Form, Formik, useField, useFormikContext } from "formik"

import styles from "./Settings.module.css"
import { Button } from "../../components/Button/Button"
import { object, string } from "yup"
import { TextField } from "../../components/TextField/TextField"
import { useAppDispatch } from "../../app/hooks"
import { deleteAccount } from "../auth/authSlice"

type DeleteAccountModalProps = {
  isOpen: boolean
}

const deleteAccountSchema = object({
  password: string().required(),
})

export function DeleteAccountModal(props: DeleteAccountModalProps) {
  const dispatch = useAppDispatch()

  const handleSubmit = (value: { password: string }) => {
    console.log("trying to delete account with pwd", value.password)
    dispatch(deleteAccount(value.password))
  }

  return (
    <div
      style={{
        visibility: props.isOpen ? "visible" : "hidden",
      }}
      className={styles.modalOverlay}
    >
      <div className={styles.modal}>
        <h3>Delete Account</h3>
        <p>You're about to delete your account, this action is irreversible</p>
        <Formik
          initialValues={{ password: "" }}
          onSubmit={handleSubmit}
          validationSchema={deleteAccountSchema}
        >
          {({ touched, isValid }) => (
            <Form>
              <TextField
                type="password"
                name="password"
                placeholder="Enter your password here"
              ></TextField>
              <div className={styles.modalActions}>
                <Button
                  variant="danger"
                  disabled={!isValid || !touched.password}
                  type="submit"
                >
                  Delete account
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
