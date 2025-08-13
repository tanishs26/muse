import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  description,
  children,
  onChange,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-900/90 backdrop-blur-sm fixed inset-0" />
        <Dialog.Content
          className="
            fixed
            p-[25px]
            bg-neutral-900/90
            border
            border-neutral-800
            max-h-full
            h-auto
            md:h-auto
            md:max-h-[80vh]
            w-[80vw]
            max-w-full
            md:max-w-full
            md:w-[500px]
            top-[50%]
            left-[50%]
            translate-x-[-50%]
            translate-y-[-50%]
            focus:outline-none
            rounded-lg"
        >
          <Dialog.Title
            className="
          text-center
          font-bold 
          text-xl
          mb-5"
          >
            {title}
          </Dialog.Title>
          <Dialog.Description className="mb-5 text-center leading-normal  ">
            {description}
          </Dialog.Description>
          <div>{children}</div>
          <Dialog.Close asChild>
            <button className="absolute
            top-5
            right-5
            text-xl
            text-neutral-400
            hover:text-white
            appearance-none
            outline-0
            hover:transition
            cursor-pointer
            ">
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
