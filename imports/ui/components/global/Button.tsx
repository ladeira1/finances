import React from "react";

type ButtonVariant = "outlined" | "solid";
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const classesByVariant: { [key in ButtonVariant]: string } = {
  outlined: "bg-white text-black border-black border-solid border-2",
  solid: "bg-black text-white",
};

export const Button = ({ variant = "solid", type = "button", className, ...rest }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`py-2 px-4 h-10 flex items-center justify-center rounded ${classesByVariant[variant]} ${className}`}
      {...rest}
    />
  );
};
