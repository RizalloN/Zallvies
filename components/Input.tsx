import React, { useState } from "react";

interface InputProps {
    id: string;
    onChange: any;
    value: string;
    label: string;
    type?: string;
}
const Input: React.FC<InputProps> = ({
  id,
  onChange,
  value,
  label,
  type,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <input
        value={value}
        onChange={onChange}
        id={id}
        type={type}
        className="block rounded-md py-6 px-3 pt-1 pb-1 w-full text-md text-white
          bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer"
        placeholder=" "
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {value? null : (
        <label
          className="absolute text-md text-zinc-400 duration-150 transform 
            -translate-y-3 scale-75 top-1 z-10 origin-[0] left-3 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
            peer-focus:scale-75 peer-focus:-translate-y-2"
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Input;