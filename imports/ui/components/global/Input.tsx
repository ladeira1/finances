import React, { ForwardedRef, RefAttributes, forwardRef, useId } from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

// TODO - show error message
export const Input = forwardRef(
  ({ label, className, ...rest }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const id = useId();
    return (
      <label htmlFor={id} className="flex flex-col gap-1">
        {label}
        <input
          id={id}
          className={`border border-solid border-black rounded h-10 py-4 px-2 ${className}`}
          {...rest}
          ref={ref}
        />
      </label>
    );
  }
);
