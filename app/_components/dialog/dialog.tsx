import { JSX } from "react";
import { RxCross1 } from "react-icons/rx";



export default function Dialog(props: DialogProps): JSX.Element {
  return (
    <>
      {props.isVisible && (
        <div className="fixed inset-0 z-9999 bg-black/50 flex justify-center items-center">
          <div
            className={`bg-white p-6 rounded-lg relative min-w-fit `}
            style={{ width: props.width ? `${props.width}px` : undefined }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`flex ${
                props.closable ? "justify-between" : "justify-center"
              } items-center mb-2`}
            >
              <span className="font-bold">{props.header}</span>
              {props.closable && (
                <RxCross1
                  className="cursor-pointer"
                  onClick={() => props.setVisible(false)}
                />
              )}
            </div>

            {props.default}

            {props.footer}
          </div>
        </div>
      )}
    </>
  );
}
