import { IInputField } from "@/internals/types/fields";
import Field from "./Field";

export default function FieldPreview({
  engineField,
  value,
  width,
}: {
  engineField: IInputField;
  value: any;
  width: number;
}) {
  return (
    <div
      className="shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] p-2 rounded-md bg-card"
      style={{
        width,
      }}
    >
      <Field field={engineField} isPreview={true} value={value} />
    </div>
  );
}
