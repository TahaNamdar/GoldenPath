import React from "react";

type Props = {
  width?: string;
  type: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler;
  label?: string;
  children?: React.ReactNode;
};

export default function InputFiled({
  width,
  type,
  placeholder,
  onChange,
  label,
  children,
}: Props) {
  return (
    <div>
      <p className="text-white text-2xl md:text-3xl mb-[1rem] md:mb-[1.2rem]">
        {label}
      </p>
      <div className="relative flex items-center">
        <div className="absolute pl-[1.8rem] md:pl-[2rem]">{children}</div>
        <input
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          className={`bg-darkGunmetal ${width} pl-[6rem] md:pl-[6rem] text-3xl md:text-[2.8rem] border-none focus:outline-none rounded-[1.4rem] text-white pt-[1.4rem] pb-[1.4rem] md:pt-[1.8rem] md:pb-[1.8rem]`}
        />
      </div>
    </div>
  );
}
