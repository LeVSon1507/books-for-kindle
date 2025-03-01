import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface TextFormFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  type?: string;
  min?: string;
  max?: string;
  step?: string;
  required?: boolean;
}

export const TextFormField = ({
  control,
  name,
  label,
  placeholder,
  description,
  type = "text",
  min,
  max,
  step,
  required = false,
}: TextFormFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className="flex align-middle">
              {label}
              {required && <p className="text-red-500 mt-1">*</p>}
            </FormLabel>
            <FormControl>
              <Input
                placeholder={placeholder}
                type={type}
                min={min}
                max={max}
                step={step}
                {...field}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
