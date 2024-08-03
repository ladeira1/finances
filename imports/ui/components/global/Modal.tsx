import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalProps = { isOpen: boolean; children: ReactNode };

export const Modal = ({ isOpen, ...rest }: ModalProps) => {
  const root = document.getElementById("app-root");
  if (!root || !isOpen) return null;

  return createPortal(
    <div className="absolute w-full h-full flex items-center justify-center">
      <div className="bg-white p-4 border-solid border-black border-2 rounded" {...rest} />
    </div>,
    root
  ) as unknown as JSX.Element;
};
