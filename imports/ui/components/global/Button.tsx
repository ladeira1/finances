import React from "react";

type ButtonVariant = "outlined" | "solid" | "unstyled";
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const classesByVariant: { [key in ButtonVariant]: string } = {
  outlined: "bg-white text-black border-black border-solid border-2",
  solid: "bg-black text-white",
  unstyled: "",
};

export const Button = ({ variant = "solid", type = "button", className, ...rest }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`py-2 px-4 h-10 flex items-center justify-center rounded hover:opacity-50 ease-in duration-100 ${classesByVariant[variant]} ${className}`}
      {...rest}
    />
  );
};
