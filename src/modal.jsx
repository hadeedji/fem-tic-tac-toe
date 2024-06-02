import { useEffect, useRef } from "react";

export default ({ isOpen, children, className, onClose }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (isOpen) {
      ref.current.showModal();

      if (onClose) {
        ref.current.addEventListener("close", onClose);
      }
    } else {
      ref.current.close();
    }
  }, [isOpen]);

  return (
    <dialog
      className="h-64 w-screen max-w-[100vw] bg-navy-700 backdrop:bg-black/50"
      ref={ref}
    >
      <div className="flex h-full w-full items-center justify-center">
        <div className={className}>{children}</div>
      </div>
    </dialog>
  );
};
