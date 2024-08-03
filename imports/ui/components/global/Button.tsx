import React from "react";

type ButtonVariant = "outlined" | "solid";
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const classesByVariant: { [key in ButtonVariant]: string } = {
  outlined: "bg-white text-black border-black border-solid border-2",
  solid: "bg-black text-white",
};

export const Button = ({ variant = "solid", className, ...rest }: ButtonProps) => {
  return (
    <button className={`py-2 px-4 rounded ${classesByVariant[variant]} ${className}`} {...rest} />
  );
};
