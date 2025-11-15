import { JSX } from "react";
import { RxCross1 } from "react-icons/rx";

interface DialogProps {
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
  header: string;
  isClosable?: boolean;
  content?: string;
  buttonFooter?: JSX.Element;
}

export default function Dialog(props: DialogProps): JSX.Element {
  return (
    <>
      <div className="fixed inset-0 z-9999 bg-black/50 flex justify-center items-center">
        <div
          className="bg-white p-6 rounded-lg relative min-w-[300px] "
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`flex ${
              props.isClosable ? "justify-between" : "justify-center"
            } items-center`}
          >
            <span className="font-bold">{props.header}</span>
            {props.isClosable && (
              <RxCross1
                className="cursor-pointer"
                onClick={() => props.setVisible(false)}
              />
            )}
          </div>

          <span className="flex justify-center items-center mt-2 ">{props.content}</span>

          {props.buttonFooter}

        </div>
      </div>
    </>
  );
}
