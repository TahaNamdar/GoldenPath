import React, { CSSProperties } from "react";

type Props = {
  width?: string;
  type: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler;
  label?: string;
  children?: React.ReactNode;
  style?: CSSProperties;
  fontSize: string;
  onkeyup?: HTMLInputElement | any;
  maxlength?: any;
  id?: string;
  value?: any;
  register?: any;
  registerName?: string;
};

export default function InputFiled({
  width,
  type,
  placeholder,
  onChange,
  label,
  children,
  style,
  fontSize,
  onkeyup,
  id,
  maxlength,
  value,
  registerName,
  register,
}: Props) {
  return (
    <div>
      <p className="text-white text-[1.8rem] pl-[2rem] sm:text-2xl md:text-3xl mb-[0.9rem] sm:mb-[1rem] md:mb-[1.2rem]">
        {label}
      </p>
      <div className="relative flex items-center">
        <div className="absolute pl-[1.6rem] sm:pl-[1.8rem] md:pl-[2rem]">
          {children}
        </div>
        <input
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onKeyUp={onkeyup}
          maxLength={maxlength}
          id={id}
          value={value}
          {...(register && register(registerName))}
          className={`bg-input ${style} ${fontSize} ${width} border-transparent focus:border-transparent focus:ring-0 pl-[6rem]  md:pl-[6.8rem]  border-none focus:outline-none rounded-[1.4rem] text-white pt-[1.6rem] pb-[1.6rem] sm:pt-[1.4rem] sm:pb-[1.4rem] md:pt-[1.5rem] md:pb-[1.5rem] xl:pt-[1.8rem] xl:pb-[1.8rem]`}
        />
      </div>
    </div>
  );
}
