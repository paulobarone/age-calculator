export default function ResponseData(props) {
  return (
    <p className="font-extrabold italic text-4xl"><span className="text-purple">{props.data}</span> {props.dataType}</p>
  )
}