import InputContainer from "./components/InputContainer/InputContainer";
import ResponseData from "./components/ResponseData/ResponseData";
import iconArrow from "./assets/img/icon-arrow.svg";

export default function App() {
  const dataTypes = ['year', 'month', 'day', 'hour', 'minute', 'second'];

  return (
    <section className="bg-white px-6 py-12 rounded-3xl mt-20 mx-6">
      <form className="flex flex-col gap-4 justify-between">
        <div className="flex flex-row justify-between">
          <InputContainer id="day" placeholder="dd" />
          <InputContainer id="month" placeholder="mm" />
          <InputContainer id="year" placeholder="dd" />
        </div>
        <div className="flex flex-row justify-between">
          <InputContainer id="hour" placeholder="mm" />
          <InputContainer id="minute" placeholder="mm" />
          <InputContainer id="second" placeholder="ss" />
        </div>
        <div className="relative flex justify-center items-center w-full h-[1px] bg-gray-300 my-10">
          <button type="submit" className="absolute bg-purple rounded-full p-4"><img className="w-8" src={iconArrow} alt="Ícone de uma seta apontada para baixo"/></button>
        </div>
      </form>
      <div className="mt-4">
        {dataTypes.map((item) => {
          return <ResponseData data="--" dataType={item} />
        })}
      </div>
    </section>
  );
}