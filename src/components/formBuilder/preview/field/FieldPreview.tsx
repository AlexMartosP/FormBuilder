import { SomeFieldExceptColumn } from "@/internals/types/fieldTypes/fields";
import Field from "./Field";

export default function FieldPreview({
  engineField,
  value,
  width,
}: {
  engineField: SomeFieldExceptColumn;
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
      <Field
        field={engineField}
        onChange={() => {}}
        isPreview={true}
        value={value}
      />
    </div>
  );
}
