import { useField } from "formik"
import styles from "./TextField.module.css"

type TextFieldProps = {
  label?: string
  placeholder?: string
  type?: string
  name: string
}

export function TextField(props: TextFieldProps) {
  const [field, meta] = useField(props.name)

  return (
    <div className={styles.textfield}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        {...field}
        {...props}
      />
      <span>{meta.error && meta.touched ? meta.error : ""}</span>
    </div>
  )
}
