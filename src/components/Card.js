import '../css/Card.css'

export default function Card(props) {
    let classes = 'card ' + props.className;
    return <div className={classes}>{props.children}</div>
}