import "./Alert.css"

type AlertProps = {
  type: "success" | "error"
  outlined?: boolean
  children: string
  visible?: boolean
}

const alertStyle = (type: "success" | "error", outlined: boolean, visible: boolean) => {
  let style = "alert"
  style += ` alert-${type}`
  style += outlined ? " alert-outlined" : ""
  style += visible ? '' : ' alert-hidden'

  return style
}

export function Alert(props: AlertProps) {
  const { outlined = false, visible = true } = props
  return (
    <div className={alertStyle(props.type, outlined, visible)}>{props.children}</div>
  )
}
