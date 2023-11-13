import { AvailableInternalFieldIds } from "@/internals/types/internalFields";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { ChangeEventHandler } from "react";
import SelectField from "./SelectField";
import MultiField from "./MultiField";

// No duplication
// Make this typesafe
const fields: Record<AvailableInternalFieldIds, any> = {
  text_input: ({ ...args }) => <Input type="text" {...args} />,
  number_input: ({ ...args }) => <Input type="number" {...args} />,
  checkbox: <></>,
  select: SelectField,
  multi: MultiField,
};

export default function Field({
  label,
  placeholder,
  type,
  value,
  options,
  onChange,
}: {
  label?: string;
  placeholder?: string;
  type: AvailableInternalFieldIds;
  value: any;
  options?: { value: string; label: string }[];
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  const Component = fields[type];

  console.log(options);

  return (
    <>
      {label && <Label>{label}</Label>}
      {type == "select" ? (
        <Component
          value={value}
          options={options}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <Component
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </>
  );
}
