"use client";
import { useState, useRef } from "react";
import InputWithIcon from "@components/input";
import SVGRunSquare from "@components/svg/runSquare";
import SVGRun from "@components/svg/run";
import SVGArrowUp from "@components/svg/arrowUp";
import SVGClockBadge from "@components/svg/clockBadge";
import SVGCalendarBadge from "@components/svg/calendarBadge";
import SVGMedal from "@components/svg/medal";
import SVGSquareAndArrowDown from "@components/svg/squareAndArrowDown";
import WebGLRenderer from "@components/WebGLRenderer";
import "@style/globals.css";

const Page = () => {
  const [data, setData] = useState({});
  const [image, setImage] = useState(null);
  const canvasRef = useRef(null);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      if (value === "") {
        const newData = { ...prev };
        delete newData[name];
        return newData;
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  const uploadImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <main className="container mx-auto px-5 py-3 space-y-3">
      <nav className="grid grid-cols-2">
        {/* Logo */}
        <div className="justify-self-start flex items-center gap-1">
          {/* Shape */}
          <div className="w-8">
            <SVGRunSquare />
          </div>
          {/* Text */}
          <div className="leading-4 font-bold uppercase">
            <h1 className="text-workout">Workout</h1>
            <h1>Share</h1>
          </div>
        </div>
        {/* Nav Btn */}
        <div className="justify-self-end">
          <button
            onClick={() => canvasRef.current.exportImage()}
            className="group h-10 bg-workout disabled:bg-slate-100 px-3 py-2 rounded-xl">
            <SVGSquareAndArrowDown className="w-4 h-4 fill-slate-800 group-disabled:fill-slate-400" />
          </button>
        </div>
      </nav>

      <section className="relative group">
        <WebGLRenderer
          onRef={canvasRef}
          data={data}
          image={image}
        />

        {/* Upload Placeholder */}
        <input
          id="image"
          className="hidden"
          type="file"
          onChange={uploadImage}
        />
        <label
          htmlFor="image"
          className={`${
            image ? "hidden" : "absolute"
          } -z-1 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4`}>
          <div className="w-16">
            <SVGArrowUp className="fill-slate-300" />
          </div>
          <h1 className="text-center uppercase whitespace-nowrap text-xs font-semibold leading-4 tracking-wide text-slate-300">
            click here to
            <br />
            choose your picture
          </h1>
        </label>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <InputWithIcon
          name="workout"
          placeholder="Indoor Run"
          value={data.workout}
          onChange={handleInput}
          icon={<SVGRun className="w-6 h-6 fill-slate-800" />}
        />
        <InputWithIcon
          name="result"
          placeholder="---"
          value={data.result}
          onChange={handleInput}
          icon={<SVGMedal className="w-6 h-6 fill-slate-800" />}
        />
        <InputWithIcon
          name="period"
          placeholder="00:00-00:00"
          value={data.period}
          onChange={handleInput}
          icon={<SVGClockBadge className="w-6 h-6 fill-slate-800" />}
        />
        <InputWithIcon
          name="date"
          placeholder="01/01/2024"
          value={data.date}
          onChange={handleInput}
          icon={<SVGCalendarBadge className="w-6 h-6 fill-slate-800" />}
        />
      </section>
    </main>
  );
};

export default Page;
