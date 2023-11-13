import { Checkbox } from "@/components/ui/Checkbox";
import { SomeFieldExceptColumn } from "@/internals/types/fields";

export default function CheckboxField({
  field,
  value,
  ...props
}: {
  field: SomeFieldExceptColumn;
  value: string[];
}) {
  return (
    <div>
      {Array.isArray(field.extraProps?.options.value) && (
        <>
          {field.extraProps?.options.value.map((option) => (
            <div className="flex items-center gap-2" key={option.value}>
              <Checkbox
                id={option.value}
                value={option.value}
                checked={value ? value.includes(option.value) : false}
                {...props}
                name={field.name}
                onCheckedChange={(checked) => {
                  return checked
                    ? props.onChange([...value, option.value])
                    : props.onChange(value?.filter((v) => v !== option.value));
                }}
              />

              <label htmlFor={option.value}>{option.label}</label>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
