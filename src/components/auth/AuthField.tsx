import { InputHTMLAttributes } from "react";

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function AuthField({ label, id, ...rest }: AuthFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-sans uppercase tracking-wider text-espresso-soft mb-2">
        {label}
      </label>
      <input
        id={id}
        {...rest}
        className="w-full bg-transparent border-b border-hairline pb-2.5 text-sm text-espresso placeholder:text-espresso-soft/70 focus:outline-none focus:border-copper transition-colors duration-300 ease-premium"
      />
    </div>
  );
}
