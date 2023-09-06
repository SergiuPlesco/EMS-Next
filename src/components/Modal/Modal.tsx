import React, { useRef } from "react";

type ModalProps = {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
};

const Modal = ({ open, children, onClose, title }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={` ${
        open ? "flex" : "hidden"
      } justify-center md:items-center w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)]  z-[9999]`}
    >
      <div
        className="bg-white w-full md:max-w-[600px] md:max-h-[900px] h-full p-4 md:rounded"
        ref={modalRef}
      >
        <div className="flex justify-between items-center mb-8">
          <p>{title}</p>
          <button onClick={onClose}>close</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
