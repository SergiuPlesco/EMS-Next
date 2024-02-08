import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
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

      <DialogContent className="flex flex-col justify-start h-full md:h-auto sm:max-w-[600px] pr-2">
        <DialogHeader>
          <DialogTitle className="text-left">{title}</DialogTitle>
          <DialogDescription className="text-left">
            {description}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea type="auto" className="max-h-[700px] pr-4">
          {children}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
