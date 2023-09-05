import React, { useRef } from "react";

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ open, children, onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={` ${
        open ? "flex" : "hidden"
      } justify-center items-start md:items-center w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.5)]  z-[9999]`}
    >
      <div
        className="bg-white w-full md:max-w-[600px] md:max-h-[900px] h-full p-2 md:rounded"
        ref={modalRef}
      >
        <div className="flex justify-between items-center">
          <p>Edit intro</p>
          <button onClick={onClose}>close</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
