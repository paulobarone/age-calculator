import iconArrow from "./assets/img/icon-arrow.svg";
import { useState } from "react";

export default function App() {
  const [ data, setData ] = useState({ days: '--', months: '--', years: '--'});
  const [ errors, setErrors ] = useState({ dayError: null, monthError: null, yearError: null });

  const calculateDate = (e) => {
    e.preventDefault()
		const { day, month, year } = e.target.elements
		const valueDate = {
			day: Number(day.value),
			month: Number(month.value),
			year: Number(year.value)
		}

    const currentDate = new Date(0);
    const pastDate = new Date(valueDate.year, valueDate.month - 1, valueDate.day);
    const diffDate = new Date(Date.now() - pastDate.getTime());

    checkErrors(valueDate.day, valueDate.month, valueDate.year);
    console.log(errors);

    setData({
      years: Math.abs(diffDate.getUTCFullYear() - currentDate.getUTCFullYear()),
      months: Math.abs(diffDate.getUTCMonth() - currentDate.getUTCMonth()),
      days: Math.abs(diffDate.getUTCDate() - currentDate.getUTCDate())
    });
  }

  const checkPluralDate = (number) => {
    if (number === 0 || number >= 2) {
      return true;
    }
  }

  const checkErrors = (day, month, year) => {
    setErrors({dayError: null, monthError: null, yearError: null});
    const newObject = { ...errors };

    if(day === '') {
      newObject.dayError = 'Preencha o campo dia';
    } else {
      const totalDaysMonth = new Date(year, month, 0).getDate() || 31;
      if(day > totalDaysMonth) {
        newObject.dayError = `O mês possui apenas ${totalDaysMonth} dias`;
      } else if(day < 1) {
        newObject.dayError = 'Coloque um valor válido';
      }
    }

    if(month === '') {
      newObject.monthError = 'Preencha o campo mês';
    } else if(month > 12 || month < 1) {
      newObject.monthError = 'Coloque um valor válido';
    }

    if(year === '') {
      newObject.yearError = 'Preencha o campo ano';
    } else if(year < 1) {
      newObject.yearError = 'Coloque um valor válido';
    }
  }

  return (
    <section className="bg-white px-6 py-12 rounded-3xl rounded-br-[150px] mx-[5%] mt-20">
      <form onSubmit={calculateDate} className="flex flex-col gap-4 justify-between">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col w-[30%]">
            <label className="text-gray-500 tracking-[.25em] mb-1 text-sm font-bold " htmlFor="day">DIA</label>
            <input autoComplete="off" required name="day" className="font-bold text-xl p-3 border-solid border-2 border-gray-300 rounded-md outline-none focus:border-purple" type="number" placeholder="DD" id="day" />
            {errors.dayError != null && <span className="text-center text-xs font-normal text-light-red">{errors.dayError}</span>}
          </div>
          <div className="flex flex-col w-[30%]">
            <label className="text-gray-500 tracking-[.25em] mb-1 text-sm font-bold " htmlFor="month">MÊS</label>
            <input autoComplete="off" required name="month" className="font-bold text-xl p-3 border-solid border-2 border-gray-300 rounded-md outline-none focus:border-purple" type="number" placeholder="MM" id="month" />
            {errors.monthError != null && <span className="text-center text-xs font-normal text-light-red">{errors.monthError}</span>}
          </div>
          <div className="flex flex-col w-[30%]">
            <label className="text-gray-500 tracking-[.25em] mb-1 text-sm font-bold" htmlFor="year">ANO</label>
            <input autoComplete="off" required name="year" className="font-bold text-xl p-3 border-solid border-2 border-gray-300 rounded-md outline-none focus:border-purple" type="number" placeholder="AAAA" id="year" />
            {errors.yearError != null && <span className="text-center text-xs font-normal text-light-red">{errors.yearError}</span>}
          </div>
        </div>
        <div className="relative flex justify-center items-center w-full h-[1px] bg-gray-300 my-10">
          <button type="submit" className="absolute bg-purple rounded-full p-4"><img className="w-8" src={iconArrow} alt="Ícone de uma seta apontada para baixo"/></button>
        </div>
      </form>
      <div className="mt-4">
        <p className="font-extrabold italic text-4xl"><span className="text-purple">{data.years}</span> {checkPluralDate(data.years) ? 'anos' : 'ano'}</p>
        <p className="font-extrabold italic text-4xl"><span className="text-purple">{data.months}</span> {checkPluralDate(data.months) ? 'meses' : 'mês'}</p>
        <p className="font-extrabold italic text-4xl"><span className="text-purple">{data.days}</span> {checkPluralDate(data.days) ? 'dias' : 'dia'}</p>
      </div>
    </section>
  );
}