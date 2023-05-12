export default function InputContainer(props) {
  return (
    <div className="flex flex-col w-[30%]">
      <label className="text-gray-500 tracking-[.25em] mb-1 text-sm" htmlFor={props.id}>{props.id.toUpperCase()}</label>
      <input className="p-3 border-solid border-2 border-gray-300 rounded-md outline-none" type="text" placeholder={props.placeholder.toUpperCase()} id={props.id} />
    </div>
  )
}