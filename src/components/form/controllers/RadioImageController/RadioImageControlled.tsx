import classNames from "classnames";
import Image from "next/image";
import React from "react";
import { useController, UseControllerProps, Control } from "react-hook-form";

interface RadioControlledOption {
  value: any;
  imageSrc: string;
  alt: string;
  label?: string;
}

interface RadioControlledProps<T extends Record<string, any>> extends UseControllerProps<T> {
  options: RadioControlledOption[];
  control: Control<T, any>; // Cần phải truyền control vào
  isBooleanValue?: boolean;
}

const RadioImageControlled = <T extends Record<string, any>>({
  control,
  name,
  options,
  rules,
  shouldUnregister,
  defaultValue,
  isBooleanValue,
}: RadioControlledProps<T>) => {
  const { field } = useController<T>({ name, control, rules, shouldUnregister, defaultValue }); // Truyền FormValues vào đây

  const isChecked = (optionValue: any, fieldValue: any) => {
    return optionValue === fieldValue;
  };

  return (
    <div className="flex items-center space-x-4">
      {options.map((option) => (
        <label key={option.value} className="cursor-pointer flex flex-col justify-center items-center">
          <input
            type="radio"
            {...field}
            value={option.value}
            className="hidden"
            onChange={(event) => {
              const val = event.target.value;
              if (!isBooleanValue) {
                field.onChange(val);
              } else {
                const boolVal = val?.toString()?.toLowerCase() === "true";
                field.onChange(boolVal);
              }
            }}
            checked={isChecked(field.value, option.value)}
          />

          <Image
            src={option.imageSrc}
            alt={option.alt}
            width={64}
            height={64}
            className={`w-16 h-16 rounded-full border-2 ${
              isChecked(field.value, option.value) ? "border-info" : "border-transparent"
            }`}
          />

          {!!option.label && (
            <span
              className={
                "text-sm " +
                classNames({
                  "text-info font-bold": isChecked(field.value, option.value),
                  "text-neutral-content": !isChecked(field.value, option.value),
                })
              }
            >
              {option.label}
            </span>
          )}
        </label>
      ))}
    </div>
  );
};

export default RadioImageControlled;
