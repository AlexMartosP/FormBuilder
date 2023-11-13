import { ChangeEventHandler } from "react";
import { Input } from "../ui/Input";
import { X } from "lucide-react";

export default function MultiField({
  value,
  onChange,
  placeholder,
}: {
  placeholder?: string;
  value: { value: string; label: string }[];
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="flex flex-col gap-3 items-center">
      {value.map((v) => (
        <div key={v.value} className="flex gap-1">
          <Input value={v.value} />
          <Input value={v.label} />
          <button>
            <X className="w-5" />
          </button>
        </div>
      ))}
    </div>
  );
}
