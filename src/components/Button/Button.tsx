import { MouseEventHandler } from "react"

import "./Button.css"

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>
  variant?: "primary" | "danger"
  outlined?: boolean
  children: string
  type?: string
  disabled?: boolean
}

export function Button(props: ButtonProps) {
  const { variant = "primary" } = props

  const resolveClassname = () => {
    let className = "btn"
    if (props.outlined) {
      className += ` btn-${variant}-outlined`
    } else {
      className += ` btn-${variant}`
    }

    return className
  }
  return (
    <button
      className={resolveClassname()}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
