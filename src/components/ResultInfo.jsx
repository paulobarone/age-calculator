import NumberAnimation from "../utils/NumberAnimation"

export default function ResultInfo({ data, singularWord, pluralWord }) {
  const checkPlural = (number, singularWord, pluralWord) => {
    return number === 0 || number >= 2 ? pluralWord : singularWord
  }

  return (
    <p className={`font-extrabold italic text-4xl md:text-6xl ${data === 0 && 'hidden'}`}>
      {data !== '--' ? <NumberAnimation finalNumber={data} /> : data} {checkPlural(data, singularWord, pluralWord)}
    </p>
  )
}