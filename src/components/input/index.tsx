import type { InputHTMLAttributes } from "react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

export function Input(props: InputProps) {
  return (
    <input
      className="border border-neutral-400 h-9 rounded-md outline-none px-2 focus:border-neutral-800"
      {...props}
    />
  );
}
