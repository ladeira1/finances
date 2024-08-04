import React, { ForwardedRef, forwardRef, useId } from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  label: string;
};

export const Input = forwardRef(
  ({ label, className, error, ...rest }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const id = useId();

    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="flex flex-col gap-1">
          {label}
          <input
            id={id}
            className={`border border-solid border-black rounded h-10 py-4 px-2 ${className}`}
            {...rest}
            ref={ref}
          />
        </label>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    );
  }
);
