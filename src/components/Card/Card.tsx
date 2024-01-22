import "./Card.css"

type CardProps = {
    children: JSX.Element
}

export function Card(props: CardProps) {
    return <div className="card">
        {props.children}
    </div>
}