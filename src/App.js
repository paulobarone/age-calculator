import iconArrow from "./assets/img/icon-arrow.svg";
import { useState } from "react";

export default function App() {
  const [ data, setData ] = useState({ days: '--', months: '--', years: '--'});

  const calculateDate = (e) => {
    e.preventDefault()
		const { day, month, year } = e.target.elements
		const valueDate = {
			day: Number(day.value),
			month: Number(month.value - 1),
			year: Number(year.value)
		}

    const currentDate = new Date(0);

    const pastDate = new Date(valueDate.year, valueDate.month, valueDate.day);
    const diffDate = new Date(Date.now() - pastDate.getTime());

    setData({
      years: Math.abs(diffDate.getUTCFullYear() - currentDate.getUTCFullYear()),
      months: Math.abs(diffDate.getUTCMonth() - currentDate.getUTCMonth()),
      days: Math.abs(diffDate.getUTCDate() + 1 - currentDate.getUTCDate())
    });
  }

  return (
    <section className="bg-white px-6 py-12 rounded-3xl rounded-br-[150px] mx-[5%] mt-20">
      <form onSubmit={calculateDate} className="flex flex-col gap-4 justify-between">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col w-[30%]">
            <label className="text-gray-500 tracking-[.25em] mb-1 text-sm" htmlFor="day">DIA</label>
            <input required name="day" className="p-3 border-solid border-2 border-gray-300 rounded-md outline-none focus:border-purple" type="number" placeholder="DD" id="day" />
          </div>
          <div className="flex flex-col w-[30%]">
            <label className="text-gray-500 tracking-[.25em] mb-1 text-sm" htmlFor="month">MÊS</label>
            <input required name="month" className="p-3 border-solid border-2 border-gray-300 rounded-md outline-none focus:border-purple" type="number" placeholder="MM" id="month" />
          </div>
          <div className="flex flex-col w-[30%]">
            <label className="text-gray-500 tracking-[.25em] mb-1 text-sm" htmlFor="year">ANO</label>
            <input required name="year" className="p-3 border-solid border-2 border-gray-300 rounded-md outline-none focus:border-purple" type="number" placeholder="AAAA" id="year" />
          </div>
        </div>
        <div className="relative flex justify-center items-center w-full h-[1px] bg-gray-300 my-10">
          <button type="submit" className="absolute bg-purple rounded-full p-4"><img className="w-8" src={iconArrow} alt="Ícone de uma seta apontada para baixo"/></button>
        </div>
      </form>
      <div className="mt-4">
        <p className="font-extrabold italic text-4xl"><span className="text-purple">{data.years}</span> anos</p>
        <p className="font-extrabold italic text-4xl"><span className="text-purple">{data.months}</span> meses</p>
        <p className="font-extrabold italic text-4xl"><span className="text-purple">{data.days}</span> dias</p>
      </div>
    </section>
  );
}