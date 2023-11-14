import { ChangeEventHandler } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/Select";

export default function SelectField({
  options,
  onChange,
  placeholder,
}: {
  placeholder?: string;
  options: { value: string; label: string }[];
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <Select defaultValue={placeholder}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem value={option.value}>{option.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
