import { ZodType } from "zod";
import { Element, Props } from "./helpers";
import { AvailableFieldIds, AvailableOptionIds } from "./ids";
import { Schema } from "./engine";

export type Test = {
  text_input: IInputField;
  number_input: IInputField;
  email_input: IInputField;
  phone_input: IInputField;
  checkbox: ICheckboxField;
  radio: IRadioField;
};

// Base
export type Rule = {
  enabled: boolean;
  label: string;
  type: AvailableFieldIds;
  value: string;
  errorMessage?: string;
};

export type RuleSet = {
  required: Rule;
  minLength?: Rule;
  maxLength?: Rule;
};

export type ExtraProp = {
  label: string;
  type: AvailableFieldIds;
  value: string | unknown[];
};

export type ExtraProps = Record<string, ExtraProp>;

// Should include extra props like options in checkbox
// Props should be editable with different fields
// Will be converted to props object on render
export type MetaField = {
  // May not need "element"
  // element: Element;
  rules: RuleSet;
  props: Props;
  primitive: Primitivies;
};

type BaseField = {
  id: AvailableFieldIds;
  label: string;
  key: string;
  name: string;
  extraProps?: ExtraProps;
  // getZodType(): Schema[string];
  // getDefaultValue(): unknown;
} & MetaField;

// Input
export type InputFieldProps = {
  type: string;
  placeholder: string;
} & Props;
export interface IInputField extends BaseField {
  props: InputFieldProps;
}

// Password

// Select
export type SelectFieldProps = {
  defaultValue: string;
} & Props;
interface ISelectField extends BaseField {
  props: SelectFieldProps;
  extraProps: {
    options: ExtraProp;
  };
}

// Radio
export type RadioFieldProps = {
  defaultValue: string;
} & Props;
interface IRadioField extends BaseField {
  props: RadioFieldProps;
  extraProps: {
    options: ExtraProp;
  };
}

// Checkbox
export type CheckboxFieldProps = {
  defaultValue: string;
} & Props;
interface ICheckboxField extends BaseField {
  props: CheckboxFieldProps;
  extraProps: {
    options: ExtraProp;
  };
}

// File
interface IFileField extends BaseField {
  acceptedFiles: string;
}

// Column
export interface IColumnField {
  id: AvailableOptionIds;
  key: string;
  amount: number;
  columns: string[][];
  addField(fieldKey: string, column: number, index: number): void;
  removeField(fieldKey: string, columnIndex?: number): void;
  getFieldIndex(fieldKey: string): {
    fieldIndex: number | null;
    columnIndex: number | null;
  };
  getSingleFilledColumnFields(): string[] | null;
}

// Fields union
export type SomeField =
  | IInputField
  | ISelectField
  | ICheckboxField
  | IRadioField
  | IFileField
  | IColumnField;

export type SomeFieldExceptColumn = Exclude<SomeField, IColumnField>;

// Unions
export type Primitivies = "string" | "number";
export type SupportedValidators = "zod";
export type SupportedFormRenderers = "react-hook-form";
