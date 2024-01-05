"use client";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import InputWithIcon from "@/component/input";
import SVGRunSquare from "@/component/svg/runSquare";
import SVGRun from "@/component/svg/run";
import SVGArrowUp from "@/component/svg/arrowUp";
import SVGClockBadge from "@/component/svg/clockBadge";
import SVGCalendarBadge from "@/component/svg/calendarBadge";
import SVGMedal from "@/component/svg/medal";
import SVGSquareAndArrowDown from "@/component/svg/squareAndArrowDown";
import "@/style/globals.css";

const Page = () => {
  const [data, setData] = useState({});
  const [image, setImage] = useState(null);
  const canvasRef = useRef(null);

  const handleInput = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const uploadImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleDownloadImage = async () => {
    const canvas = await html2canvas(canvasRef.current);
    const image = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = image;
    link.download = 'captured-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            onClick={handleDownloadImage}
            className="group h-10 bg-workout disabled:bg-slate-100 px-3 py-2 rounded-xl">
            <SVGSquareAndArrowDown className="w-4 h-4 fill-slate-800 group-disabled:fill-slate-400" />
          </button>
        </div>
      </nav>

      <section
        ref={canvasRef}
        className="relative group">
        <div
          className="w-full aspect-[3/4] bg-slate-100 rounded-2xl bg-center bg-cover"
          style={{ backgroundImage: `url(${image})` }}></div>
        {/* Upload Placeholder */}
        <input
          id="image"
          className="hidden"
          type="file"
          onChange={uploadImage}
        />
        <label
          for="image"
          className={`${
            image ? "hidden" : "absolute"
          } -z-1 top-1/3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4`}>
          <div className="w-16">
            <SVGArrowUp className="fill-slate-300" />
          </div>
          <h1 className="text-center uppercase whitespace-nowrap text-xs font-semibold leading-4 tracking-wide text-slate-300">
            click here to
            <br />
            choose your picture
          </h1>
        </label>
        {/* Overlap */}
        <div className="absolute bottom-0 w-full p-4">
          <div className="w-full bg-slate-800/60 rounded-2xl px-4 py-3 flex justify-between">
            <div className="flex gap-2">
              <div className="h-full aspect-square rounded-full bg-slate-800 p-2 grid place-content-center">
                <SVGRun className="h-6 w-6 fill-workout" />
              </div>
              <div className="whitespace-nowrap">
                <span className="font-base leading-4 text-white tracking-normal">
                  {data.workout || "Indoor Run"}
                </span>
                <h1 className="text-2xl text-workout leading-6 tracking-wide">
                  {data.result || "0.00KM"}
                </h1>
              </div>
            </div>
            <div className="h-full text-[8px] leading-[8px] tracking-wide space-y-1 text-slate-200 self-end text-right">
              <span className="block">{data.period || "00:00-00:00"}</span>
              <span className="block">{data.date || "01/01/2024"}</span>
            </div>
          </div>
        </div>
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
