import { IInputField } from "@/internals/types/fields";
import { FormControl, FormLabel } from "../ui/Form";

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
            <engineField.element
              {...engineField.props}
              {...{ ...extraProps, value }}
            />
          </FormControl>
        </>
      ) : (
        <>
          <label>{engineField.label}</label>
          <engineField.element {...engineField.props} defaultValue={value} />
        </>
      )}
    </>
  );
}
