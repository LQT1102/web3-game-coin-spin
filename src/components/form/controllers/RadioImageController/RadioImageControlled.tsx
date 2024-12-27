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
        <label key={option.value} className="cursor-pointer">
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
          <img
            src={option.imageSrc}
            alt={option.alt}
            className={`w-16 h-16 rounded-full border-2 ${
              isChecked(field.value, option.value) ? "border-blue-500" : "border-transparent"
            }`}
          />
        </label>
      ))}
    </div>
  );
};

export default RadioImageControlled;
