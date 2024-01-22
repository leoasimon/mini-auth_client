import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"

import "./Modal.css"
import { Card } from "../Card/Card"

type ModalProps = {
  isOpen: boolean
  children: JSX.Element
  onClose: () => void
}

export function Modal(props: ModalProps) {
  return (
    <div
      style={{
        visibility: props.isOpen ? "visible" : "hidden",
      }}
      className="modal-overlay"
    >
      <div className="modal">
        <Card>
          <div>
            <div className="modal-header">
              <button onClick={props.onClose}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </div>
            <div className="modal-body">{props.children}</div>
          </div>
        </Card>
      </div>
    </div>
  )
}
