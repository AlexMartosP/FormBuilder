import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { SpecialComponentProps } from "@/internals/types/components";

export default function Shadcn_RadioField({
  field,
  value,
  onChange,
  ...props
}: SpecialComponentProps) {
  console.log(field);

  return (
    <RadioGroup defaultValue={value} onValueChange={onChange}>
      {field.options.map((option) => (
        <div key={option.id} className="flex items-center space-x-2">
          <RadioGroupItem value={option.value} id={option.id} />
          <Label htmlFor={option.id}>{option.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}
