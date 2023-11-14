import { AvailableInternalFieldIds } from "@/internals/types/internalFields";
import { ChangeEventHandler } from "react";
import { Input } from "../../../ui/Input";
import { Label } from "../../../ui/Label";
import SelectField from "./SelectField";

// No duplication
const fields: Record<AvailableInternalFieldIds, any> = {
  text_input: ({ ...args }) => <Input type="text" {...args} />,
  number_input: ({ ...args }) => <Input type="number" {...args} />,
  checkbox: <></>,
  select: SelectField,
};

export default function Field<Type extends AvailableInternalFieldIds>({
  label,
  placeholder,
  type,
  value,
  options,
  onChange,
}: {
  label?: string;
  placeholder?: string;
  type: Type;
  value: any;
  options?: { value: string; label: string }[];
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  const Component = fields[type];

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
