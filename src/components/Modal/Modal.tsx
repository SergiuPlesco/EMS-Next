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
  description?: React.ReactNode | string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  text?: React.ReactNode | string;
  open?: boolean | undefined;
};

const Modal = ({
  title,
  description,
  children,
  icon,
  text,
  open,
}: ModalProps) => {
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 hover:no-underline h-[20px]">
          <div className="flex justify-end items-start gap-2">
            {text ? text : ""}
            {icon ? icon : null}
          </div>
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
