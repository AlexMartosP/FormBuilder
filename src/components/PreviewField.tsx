import { FormControl, FormField, FormItem, FormLabel } from "./ui/Form";
import { Control } from "react-hook-form";
import { useDrag } from "react-dnd";
import { IInputField } from "@/internals/types/fields";

export default function PreviewField({
  engineField,
  control,
}: {
  engineField: IInputField;
  control: Control;
}) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    // "type" is required. It is used by the "accept" specification of drop targets.
    type: "FIELD",
    item: "TEST",
    // The collect function utilizes a "monitor" instance (see the Overview for what this is)
    // to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        background: isDragging ? "0.5" : "1",
      }}
    >
      <FormField
        control={control}
        name={engineField.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{engineField.label}</FormLabel>
            <FormControl>
              <engineField.element {...engineField.props} {...field} />
            </FormControl>
          </FormItem>
        )}
      ></FormField>
    </div>
  );
}
