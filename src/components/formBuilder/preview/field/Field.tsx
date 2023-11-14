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
import { forwardRef, useId } from "react";
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

const Field = forwardRef(
  (
    { field, isPreview = false, value, onChange, ...props }: FieldProps,
    ref
  ) => {
    const id = useId();
    const { config } = useConfig();

    function renderField() {
      const fieldProps = getProps(field);

      console.log(value);

      if (isSpecialField(field)) {
        const Component = fields[field.id][config.styler];

        return (
          <Component
            field={field}
            value={value}
            onChange={onChange}
            {...props}
          />
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
);

export default Field;
