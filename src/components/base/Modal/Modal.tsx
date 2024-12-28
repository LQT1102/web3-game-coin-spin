"use client";
import React, { ReactNode, forwardRef, useEffect, useImperativeHandle, useRef } from "react";

type Props = {
  title?: string;
  children?: ReactNode;
  id?: string;
  onClose?: Function;
};

interface ModalRef {
  showModal: () => void;
  close: () => void;
}

const Modal = forwardRef<ModalRef, Props>(({ children, id = "modal", title, onClose }, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    showModal: () => dialogRef.current?.show(), //show thay cho show modal để không bị đưa lên toplayer
    close: () => dialogRef.current?.close(),
  }));

  useEffect(() => {
    //@ts-ignore
    dialogRef?.current?.addEventListener("close", () => onClose && onClose());
  }, []);

  return (
    <dialog ref={dialogRef} id={id} className="modal outline-none sm:modal-middle">
      <div className="modal-box modal-box-custom">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => {
            dialogRef.current?.close();
          }}
        >
          ✕
        </button>

        {!!title && <h3 className="font-bold text-xl mb-5 text-neutral-content">{title}</h3>}
        {children}
      </div>
      {/* close the modal when clicked outside */}
      <form method="dialog" className="modal-backdrop bg-base-100 bg-opacity-70">
        <button></button>
      </form>
    </dialog>
  );
});
export default Modal;
