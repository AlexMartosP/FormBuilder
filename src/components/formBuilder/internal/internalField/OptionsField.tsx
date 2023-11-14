import { ChangeEventHandler } from "react";
import { Input } from "../../../ui/Input";
import { X } from "lucide-react";
import { FieldOptions } from "@/internals/types/fieldTypes/fields";

export default function OptionsField({
  options,
  onChange,
  onDelete,
}: {
  options: FieldOptions[];
  onChange: (optionId: string, value: string, label: string) => void;
  onDelete: (optionId: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 items-center">
      {options.map((option) => (
        <div key={option.id} className="flex gap-1">
          <Input
            value={option.value}
            onChange={(e) => {
              if (e.target.value) {
                onChange(option.id, e.target.value, option.label);
              }
            }}
          />
          <Input
            value={option.label}
            onChange={(e) => onChange(option.id, option.value, e.target.value)}
          />
          <button onClick={() => onDelete(option.id)}>
            <X className="w-5" />
          </button>
        </div>
      ))}
    </div>
  );
}
