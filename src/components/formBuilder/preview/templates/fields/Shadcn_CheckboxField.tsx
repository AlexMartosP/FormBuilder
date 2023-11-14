import { Checkbox } from "@/components/ui/Checkbox";
import { SpecialComponentProps } from "@/internals/types/components";

export default function Shadcn_CheckboxField({
  field,
  value,
  onChange,
  ...props
}: SpecialComponentProps) {
  return (
    <div>
      {field.options.map((option) => (
        <div className="flex items-center gap-2" key={option.id}>
          <Checkbox
            id={option.value}
            value={option.value}
            checked={value ? value.includes(option.value) : false}
            {...props}
            name={field.name}
            onCheckedChange={(checked) => {
              return checked
                ? onChange([...value, option.value])
                : onChange(value?.filter((v) => v !== option.value));
            }}
          />

          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </div>
  );
}
