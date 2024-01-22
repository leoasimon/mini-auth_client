import { Form, Formik } from "formik"

import styles from "./Settings.module.css"
import { Button } from "../../components/Button/Button"
import { object, string } from "yup"
import { TextField } from "../../components/TextField/TextField"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { deleteAccount, selectMessage } from "../auth/authSlice"
import { Alert } from "../../components/Alert/Alert"
import { Modal } from "../../components/Modal/Modal"

type DeleteAccountModalProps = {
  isOpen: boolean,
  onClose: () => void
}

const deleteAccountSchema = object({
  password: string().required(),
})

export function DeleteAccountModal(props: DeleteAccountModalProps) {
  const dispatch = useAppDispatch()
  const errorMessage = useAppSelector(selectMessage)

  const handleSubmit = (value: { password: string }) => {
    dispatch(deleteAccount(value.password))
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div>
        <Alert type="error" visible={!!errorMessage}>
          {errorMessage}
        </Alert>
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
    </Modal>
  )
}
