import React, { ForwardedRef, forwardRef, useId } from "react";

type SelectOptions = {
  label: string;
  value: string;
};

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  error?: string;
  label: string;
  options: SelectOptions[];
};

export const Select = forwardRef(
  (
    { label, className, error, options, ...rest }: SelectProps,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    const id = useId();

    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="flex flex-col gap-1">
          {label}
          <select
            id={id}
            className={`border border-solid border-black rounded h-10 px-2 ${className}`}
            {...rest}
            ref={ref}
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    );
  }
);
