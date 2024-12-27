import React, { ReactNode } from "react";

type Props = {
  htmlFor?: string;
  required?: boolean;
  children: ReactNode;
  error?: string;
  label?: string | ReactNode;
};

const FieldWrapper = ({ htmlFor, required, children, label, error }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      {!!label && (
        <label htmlFor={htmlFor} className="flex items-center text-sm font-bold text-neutral-content">
          {label} {!!required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      {children}
      {!!error && <div className="text-error">{error}</div>}
    </div>
  );
};

export default FieldWrapper;
