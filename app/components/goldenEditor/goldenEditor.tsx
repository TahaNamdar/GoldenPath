"use client";

import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
} from "react";

interface Input {
  id: number;
  value: string;
  checked: boolean;
}

const GoldenEditor = () => {
  const [inputs, setInputs] = useState<Input[]>([
    { id: Date.now(), value: "", checked: false },
  ]); // Initial
  const newInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newInputRef.current) {
      newInputRef.current.focus();
    }
  }, [inputs]); // Focus the new input whenever inputs change

  const handleInputChange = (id: number, value: string) => {
    // console.log(`Input with ID ${id} changed to ${value}`);
  };

  console.log(inputs, "--------------");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, ID: number) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent the default behavior (submitting the form)
      const currentInput = inputs.find((input: any) => input.id === ID);

      if (currentInput?.value.trim() !== "") {
        const newInput = {
          id: Date.now(),
          value: "",
          checked: false,
        };
        setInputs([...inputs, newInput]);
      }
    }
  };

  const handleChecked = (id: number) => {
    setInputs((prevInputs) => {
      return prevInputs.map((input) => {
        if (input.id === id) {
          return {
            ...input,
            checked: !input.checked,
          };
        }
        return input;
      });
    });
  };

  return (
    <div className="bg-darkGunmetal rounded-sm p-10 text-white w-[200px] h-[200px]">
      <input
        type="text"
        placeholder="title"
        className="placeholder-white bg-transparent outline-none text-3xl"
      />
      {inputs.map((input: any, index: number) => (
        <div key={input.id} className="flex items-center mb-3">
          <input
            checked={input.checked}
            type="checkbox"
            className="mr-4"
            onChange={() => handleChecked(input.id)}
          />
          <input
            tabIndex={index}
            type="text"
            ref={index === inputs.length - 1 ? newInputRef : null}
            value={input.value}
            placeholder="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const updatedInputs = inputs.map((i: any) =>
                i.id === input.id ? { ...i, value: e.target.value } : i
              );
              setInputs(updatedInputs);
              handleInputChange(input.id, e.target.value);
            }}
            onKeyDown={(e) => handleKeyDown(e, input.id)}
            className={
              input.checked
                ? "line-through placeholder-white bg-transparent outline-none"
                : "placeholder-white bg-transparent outline-none"
            }
          />
        </div>
      ))}
    </div>
  );
};

export default GoldenEditor;
