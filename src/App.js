import iconArrow from "./assets/img/icon-arrow.svg";
import { useState } from "react";

export default function App() {
  const [ data, setData ] = useState({ seconds: '--', minutes: '--', hours: '--', days: '--', months: '--', years: '--'});
  const [ errors, setErrors ] = useState({ dayError: null, monthError: null, yearError: null });

  const calculateDate = (e) => {
    e.preventDefault();
    const { day, month, year } = e.target.elements;
    const valueDate = {
      day: Number(day.value),
      month: Number(month.value),
      year: Number(year.value)
    };
  
    const updatedErrors = checkErrors(valueDate.day, valueDate.month, valueDate.year);
    const isValid = Object.values(updatedErrors).every(response => response === null);
  
    if(isValid) {
      setErrors(updatedErrors);

      const currentDate = new Date(0);
      const currentTemp = new Date();
      const pastDate = new Date(valueDate.year, valueDate.month - 1, valueDate.day);
      const diffDate = new Date(Date.now() - pastDate.getTime());

      setData({
        seconds: Math.abs(pastDate.getSeconds() - currentTemp.getSeconds()),
        minutes: Math.abs(pastDate.getMinutes() - currentTemp.getMinutes()),
        hours: Math.abs(pastDate.getHours() - currentTemp.getHours()),
        years: Math.abs(diffDate.getUTCFullYear() - currentDate.getUTCFullYear()),
        months: Math.abs(diffDate.getUTCMonth() - currentDate.getUTCMonth()),
        days: Math.abs(diffDate.getUTCDate() - currentDate.getUTCDate())
      });
    } else {
      setErrors(updatedErrors);
    }
  };

  const checkErrors = (day, month, year) => {
    const errorsObject = { dayError: null, monthError: null, yearError: null };

    if (day === 0) {
      errorsObject.dayError = 'Preencha o campo dia';
    } else {
      const totalDaysMonth = new Date(year, month, 0).getDate() || 31;
      if (day > totalDaysMonth) {
        errorsObject.dayError = `O mês possui apenas ${totalDaysMonth} dias`;
      } else if (day < 1) {
        errorsObject.dayError = 'Coloque um valor válido';
      }
    }
  
    if (month === 0) {
      errorsObject.monthError = 'Preencha o campo mês';
    } else if (month > 12 || month < 1) {
      errorsObject.monthError = 'Coloque um valor válido';
    }
  
    if (year === 0) {
      errorsObject.yearError = 'Preencha o campo ano';
    } else {
      if (year < 1) {
        errorsObject.yearError = 'Coloque um valor válido';
      }
    }
  
    if (year > new Date().getFullYear()) {
      errorsObject.yearError = 'A data não pode estar no futuro';
    } else if (year === new Date().getFullYear()) {
      if (month === new Date().getMonth() + 1) {
        if (day > new Date().getDate()) {
          errorsObject.dayError = 'A data não pode estar no futuro';
        }
      } else if (month > new Date().getMonth() + 1) {
        errorsObject.monthError = 'A data não pode estar no futuro';
      }
    }
  
    return errorsObject;
  };

  const checkPluralDate = (number) => {
    if(number === 0 || number >= 2) {
      return true;
    }
  }

  return (
    <section className="bg-white px-6 py-12 rounded-3xl rounded-br-[150px] mx-[5%] md:mx-[10%] md:px-8 lg:mx-[25%] lg:px-12 mt-20">
      <form onSubmit={calculateDate} className="flex flex-col gap-4 justify-between">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col w-[30%]">
            <label className={`${errors.dayError ? "text-light-red" : "text-gray-500"} tracking-[.25em] mb-1 text-sm md:text-lg font-bold`} htmlFor="day">DIA</label>
            <input autoComplete="off" name="day" className={`font-bold text-xl lg:text-2xl p-3 border-solid border-2 ${errors.dayError ? "invalid" : "border-gray-300 focus:border-purple"} rounded-md outline-none`} type="number" placeholder="DD" id="day" />
            {errors.dayError && <span className="text-center text-xs font-thin mt-1 italic text-light-red">{errors.dayError}</span>}
          </div>
          <div className="flex flex-col w-[30%]">
            <label className={`${errors.monthError ? "text-light-red" : "text-gray-500"} tracking-[.25em] mb-1 text-sm md:text-lg font-bold`} htmlFor="month">MÊS</label>
            <input autoComplete="off" name="month" className={`font-bold text-xl lg:text-2xl p-3 border-solid border-2 ${errors.monthError ? "invalid" : "border-gray-300 focus:border-purple"} rounded-md outline-none`} type="number" placeholder="MM" id="month" />
            {errors.monthError && <span className="text-center text-xs font-thin mt-1 italic text-light-red">{errors.monthError}</span>}
          </div>
          <div className="flex flex-col w-[30%]">
            <label className={`${errors.yearError ? "text-light-red" : "text-gray-500"} tracking-[.25em] mb-1 text-sm md:text-lg font-bold`} htmlFor="year">ANO</label>
            <input autoComplete="off" name="year" className={`font-bold text-xl lg:text-2xl p-3 border-solid border-2 ${errors.yearError ? "invalid" : "border-gray-300 focus:border-purple"} rounded-md outline-none`} type="number" placeholder="AAAA" id="year" />
            {errors.yearError && <span className="text-center text-xs font-thin mt-1 italic text-light-red">{errors.yearError}</span>}
          </div>
        </div>
        <div className="relative flex justify-center items-center w-full h-[1px] bg-gray-300 my-10 md:justify-end">
          <button type="submit" className="absolute bg-purple rounded-full p-4"><img className="w-8" src={iconArrow} alt="Ícone de uma seta apontada para baixo"/></button>
        </div>
      </form>
      <div className="mt-4">
        <p className="font-extrabold italic text-4xl md:text-6xl"><span className="text-purple">{data.years}</span> {checkPluralDate(data.years) ? 'anos' : 'ano'}</p>
        <p className="font-extrabold italic text-4xl md:text-6xl"><span className="text-purple">{data.months}</span> {checkPluralDate(data.months) ? 'meses' : 'mês'}</p>
        <p className="font-extrabold italic text-4xl md:text-6xl"><span className="text-purple">{data.days}</span> {checkPluralDate(data.days) ? 'dias' : 'dia'}</p>
        <p className="font-extrabold italic text-4xl md:text-6xl"><span className="text-purple">{data.hours}</span> {checkPluralDate(data.hours) ? 'horas' : 'hora'}</p>
        <p className="font-extrabold italic text-4xl md:text-6xl"><span className="text-purple">{data.minutes}</span> {checkPluralDate(data.minutes) ? 'minutos' : 'minuto'}</p>
        <p className="font-extrabold italic text-4xl md:text-6xl"><span className="text-purple">{data.seconds}</span> {checkPluralDate(data.seconds) ? 'segundos' : 'segundo'}</p>
      </div>
    </section>
  );
}