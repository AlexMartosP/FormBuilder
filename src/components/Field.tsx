"use client";

import { Props } from "@/internals/types/helpers";
import { AvailableFieldIds } from "@/internals/types/ids";
import { Label } from "@radix-ui/react-label";
import { ChangeEventHandler, PropsWithoutRef, useId } from "react";
import { Input } from "./ui/Input";

type FieldProps = {
  label?: string;
  name: string;
  type: AvailableFieldIds;
  defaultValue?: string;
  placeholder?: string;
  extraProps?: Props;
  onChange: (value: string) => void;
};

export default function Field({
  label,
  name,
  type,
  defaultValue,
  placeholder,
  extraProps,
  onChange,
}: FieldProps) {
  const id = useId();

  function renderField() {
    switch (type) {
      case "text_input":
        return (
          <Input
            name={name}
            type="text"
            defaultValue={defaultValue}
            placeholder={placeholder}
            {...extraProps}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case "number_input":
        return (
          <Input
            name={name}
            type="number"
            defaultValue={defaultValue}
            placeholder={placeholder}
            {...extraProps}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case "email_input":
        return (
          <Input
            name={name}
            type="email"
            defaultValue={defaultValue}
            placeholder={placeholder}
            {...extraProps}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case "phone_input":
        return (
          <Input
            name={name}
            type="tel"
            defaultValue={defaultValue}
            placeholder={placeholder}
            {...extraProps}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      case "checkbox":
        return <p>Checkbox</p>;
      case "radio":
        return <p>Radio</p>;
      default:
        <p>Should not render</p>;
    }
  }

  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      {renderField()}
    </div>
  );
}
