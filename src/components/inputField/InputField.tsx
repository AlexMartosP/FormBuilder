import { IInputField } from "@/internals/types/fields";
import { FormControl, FormLabel } from "../ui/Form";
import Field from "../field/Field";

export default function InputField({
  engineField,
  isPreview,
  value,
  ...extraProps
}: {
  engineField: IInputField;
  value?: any;
  isPreview: boolean;
}) {
  return (
    <>
      {!isPreview ? (
        <>
          <FormLabel>{engineField.label}</FormLabel>
          <FormControl>
            <Field field={engineField} />
          </FormControl>
        </>
      ) : (
        <>
          <label>{engineField.label}</label>
          <Field field={engineField} />
        </>
      )}
    </>
  );
}
