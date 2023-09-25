import React, { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

type ModalProps = {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
};

const Modal = ({ open, children, onClose, title }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isCloseHovered, setIsCloseHovered] = useState(false);

  const handleMouseOver = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (e.type === "mouseover") {
      setIsCloseHovered(true);
    }
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (e.type === "mouseleave") {
      setIsCloseHovered(false);
    }
  };

  return (
    <div
      className={` ${
        open ? "flex" : "hidden"
      } justify-center md:items-center w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)]  z-[1]`}
    >
      <div
        className="bg-white w-full md:max-w-[600px] md:max-h-[900px] h-full p-4 md:rounded z-[2]"
        ref={modalRef}
      >
        <div className="flex justify-between items-center mb-8">
          <p>{title}</p>
          <button
            onClick={onClose}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            className={`rounded-full p-1 ${
              isCloseHovered ? "bg-slate-300" : "bg-transparent"
            }`}
          >
            <AiOutlineClose fontSize={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
