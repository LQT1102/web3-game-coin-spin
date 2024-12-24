import React from "react";
import { useController, UseControllerProps, Control } from "react-hook-form";

interface RadioControlledOption {
  value: string;
  imageSrc: string;
  alt: string;
  label?: string;
}

interface RadioControlledProps<T extends Record<string, any>> extends UseControllerProps<T> {
  options: RadioControlledOption[];
  control: Control<T, any>; // Cần phải truyền control vào
}

const RadioImageControlled = <T extends Record<string, any>>({
  control,
  name,
  options,
  rules,
  shouldUnregister,
}: RadioControlledProps<T>) => {
  const { field } = useController<T>({ name, control, rules, shouldUnregister }); // Truyền FormValues vào đây

  return (
    <div className="flex items-center space-x-4 p-4">
      {options.map((option) => (
        <label key={option.value} className="cursor-pointer">
          <input
            type="radio"
            {...field}
            value={option.value}
            className="hidden"
            checked={field.value === option.value}
          />
          <img
            src={option.imageSrc}
            alt={option.alt}
            className={`w-16 h-16 rounded-full border-2 ${
              field.value === option.value ? "border-blue-500" : "border-transparent"
            }`}
          />
        </label>
      ))}
    </div>
  );
};

export default RadioImageControlled;
