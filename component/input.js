const InputWithIcon = ({ placeholder, icon, value, onChange, name }) => {
  return (
    <div className=" rounded-2xl bg-slate-100 h-12 flex items-center px-3 gap-2">
      <div className="w-6">
        {icon}
      </div>
      <hr className="w-[1px] h-6 bg-slate-300" />
      <div className="h-auto flex flex-col gap-1">
        <label className="text-[8px] leading-[8px] text-slate-400 tracking-wider uppercase">
          {name || "Label"}
        </label>
        <input
          className="w-full outline-none placeholder:text-slate-400 text-slate-800 bg-transparent leading-4"
          type="text"
          placeholder={placeholder || "Placeholder"}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default InputWithIcon;
