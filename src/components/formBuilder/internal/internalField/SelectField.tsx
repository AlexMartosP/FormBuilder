import { ChangeEventHandler } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/Select";

export default function SelectField({
  value,
  options,
  onChange,
  placeholder,
}: {
  placeholder?: string;
  value: any;
  options: { value: string; label: string }[];
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem value={option.value}>{option.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
