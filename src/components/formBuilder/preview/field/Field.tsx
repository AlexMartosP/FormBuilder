"use client";

import { useConfig } from "@/context/config/ConfigProvider";
import { SpecialComponent } from "@/internals/types/components";
import {
  AllFields,
  SomeFieldExceptColumn,
  SpecialField,
} from "@/internals/types/fieldTypes/fields";
import { Element } from "@/internals/types/helpers";
import { SupportedFields, SupportedStylers } from "@/internals/types/supports";
import getProps from "@/internals/utils/getProps";
import { isSpecialField } from "@/internals/utils/helpers/isSpecialField";
import { Label } from "@radix-ui/react-label";
import { useId } from "react";
import { FormLabel } from "../../../ui/Form";
import { Input } from "../../../ui/Input";
import Shadcn_CheckboxField from "../templates/fields/Shadcn_CheckboxField";
import Shadcn_RadioField from "../templates/fields/Shadcn_RadioField";

// Value type
type FieldProps = {
  field: SomeFieldExceptColumn;
  isPreview?: boolean;
  value?: any;
  onChange: (...args: any[]) => void;
};

type FieldsWComponents = {
  [fieldKey in SupportedFields]: {
    [styleKey in SupportedStylers]: AllFields[fieldKey] extends SpecialField
      ? SpecialComponent
      : Element;
  };
};

const fields: FieldsWComponents = {
  text_input: {
    shadcn: Input,
  },
  number_input: {
    shadcn: Input,
  },
  email_input: {
    shadcn: Input,
  },
  phone_input: {
    shadcn: Input,
  },
  checkbox: {
    shadcn: Shadcn_CheckboxField,
  },
  radio: {
    shadcn: Shadcn_RadioField,
  },
};

export default function Field({
  field,
  isPreview = false,
  value,
  onChange,
  ...props
}: FieldProps) {
  const id = useId();
  const { config } = useConfig();

  function renderField() {
    const fieldProps = getProps(field);

    if (isSpecialField(field)) {
      const Component = fields[field.id][config.styler];

      return (
        <Component field={field} value={value} onChange={onChange} {...props} />
      );
    } else {
      const Component = fields[field.id][config.styler];

      return (
        <Component
          name={field.name}
          value={value}
          onChange={onChange}
          {...fieldProps}
          {...props}
        />
      );
    }
  }

  return (
    <div>
      {field.label && (
        <>
          {isPreview ? (
            <Label htmlFor={id}>
              {field.label}
              {field.rules.required.enabled && "*"}
            </Label>
          ) : (
            <FormLabel>
              {field.label}
              {field.rules.required.enabled && "*"}
            </FormLabel>
          )}
        </>
      )}
      {renderField()}
    </div>
  );
}

// function renderField() {
//   switch (field.id) {
//     case "text_input":
//       return <Input name={field.name} type="text" value={value} {...props} />;

//     case "number_input":
//       return (
//         <Input name={field.name} type="number" value={value} {...props} />
//       );

//     case "email_input":
//       return (
//         <Input name={field.name} type="email" value={value} {...props} />
//       );

//     case "phone_input":
//       return <Input name={field.name} type="tel" value={value} {...props} />;
//     case "checkbox":
//       return (
//         <div>
//           {Array.isArray(field.extraProps?.options.value) && (
//             <>
//               {field.extraProps?.options.value.map((option) => (
//                 <div className="flex items-center gap-2" key={option.value}>
//                   <Checkbox
//                     id={option.value}
//                     value={option.value}
//                     checked={value ? value.includes(option.value) : false}
//                     {...props}
//                     name={field.name}
//                     onCheckedChange={(checked) => {
//                       return checked
//                         ? props.onChange([...value, option.value])
//                         : props.onChange(
//                             value?.filter((v) => v !== option.value)
//                           );
//                     }}
//                   />

//                   <label htmlFor={option.value}>{option.label}</label>
//                 </div>
//               ))}
//             </>
//           )}
//         </div>
//       );
//     case "radio":
//       return <p>Radio</p>;
//     default:
//       <p>Should not render</p>;
//   }
// }
