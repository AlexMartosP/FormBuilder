"use client";

import { Props } from "@/internals/types/helpers";
import { AvailableFieldIds } from "@/internals/types/ids";
import { Label } from "@radix-ui/react-label";
import { ChangeEventHandler, PropsWithoutRef, useId } from "react";
import { Input } from "../ui/Input";
import { FormLabel } from "../ui/Form";
import { SomeFieldExceptColumn } from "@/internals/types/fields";
import { Checkbox } from "../ui/Checkbox";

type FieldProps = {
  field: SomeFieldExceptColumn;
  isPreview?: boolean;
  value?: string;
};

export default function Field({
  field,
  isPreview = false,
  value,
  ...props
}: FieldProps) {
  const id = useId();

  // Handle props
  function renderField() {
    switch (field.id) {
      case "text_input":
        return <Input name={field.name} type="text" value={value} {...props} />;

      case "number_input":
        return (
          <Input name={field.name} type="number" value={value} {...props} />
        );

      case "email_input":
        return (
          <Input name={field.name} type="email" value={value} {...props} />
        );

      case "phone_input":
        return <Input name={field.name} type="tel" value={value} {...props} />;
      case "checkbox":
        return (
          <div>
            {Array.isArray(field.extraProps?.options.value) && (
              <>
                {field.extraProps?.options.value.map((option) => (
                  <div
                    className="flex items-center space-x-2"
                    key={option.value}
                  >
                    <Checkbox
                      id={option.value}
                      value={option.value}
                      {...props}
                    />
                    <label htmlFor={option.value}>{option.label}</label>
                  </div>
                ))}
              </>
            )}
          </div>
        );
      case "radio":
        return <p>Radio</p>;
      default:
        <p>Should not render</p>;
    }
  }

  return (
    <div>
      {field.label && (
        <>
          {isPreview ? (
            <Label htmlFor={id}>{field.label}</Label>
          ) : (
            <FormLabel>{field.label}</FormLabel>
          )}
        </>
      )}
      {renderField()}
    </div>
  );
}
