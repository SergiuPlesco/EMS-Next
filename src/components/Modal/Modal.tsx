import { AiFillSetting } from "react-icons/ai";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ModalProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  text?: string;
};

const Modal = ({ title, description, children, icon, text }: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 hover:no-underline">
          {icon ? (
            <div className="flex justify-end items-center gap-2">
              <p className="text-[10px] font-normal text-slate-500">
                {text ?? ""}
              </p>
              {icon}
            </div>
          ) : (
            <AiFillSetting size={18} color="var(--smart-purple)" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-start h-full sm:h-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
