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
};

const Modal = ({ title, description, children }: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0">
          <AiFillSetting size={18} color="var(--smart-purple)" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-start h-full sm:max-h-[800px] sm:max-w-[600px] overflow-y-scroll">
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
