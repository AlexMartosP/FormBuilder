import { SupportedFields, SupportedOptions } from "./supports";
import { AvailableInternalFieldIds } from "./internalFields";

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
  type: SupportedFields;
  value: string;
  errorMessage?: string;
};

export type RuleSet = {
  required: Rule;
  minLength?: Rule;
  maxLength?: Rule;
};

export type EditableExtraProp<Value> = {
  label: string;
  type: AvailableInternalFieldIds;
  value: Value;
  options?: { value: string; label: string }[];
};

export type EditableProp = {
  label: string;
  type: AvailableInternalFieldIds;
  value: string;
};

export type ExtraProps = Record<string, EditableExtraProp<unknown>>;
export type Props = Record<string, EditableProp>;

export type MetaField = {
  rules: RuleSet;
  props: Props;
  primitive: Primitivies;
};

type BaseField = {
  id: SupportedFields;
  label: string;
  key: string;
  name: string;
  extraProps?: ExtraProps;
} & MetaField;

// Input
export type InputFieldProps = {
  type: EditableProp;
  placeholder: EditableProp;
} & Props;
export interface IInputField extends BaseField {
  props: InputFieldProps;
}

// Password

// Select
export type SelectFieldProps = {
  defaultValue: EditableProp;
} & Props;
interface ISelectField extends BaseField {
  props: SelectFieldProps;
  extraProps: {
    options: EditableExtraProp<{
      value: string;
      label: string;
    }>;
  };
}

// Radio
export type RadioFieldProps = {
  defaultValue: EditableProp;
} & Props;
interface IRadioField extends BaseField {
  props: RadioFieldProps;
  extraProps: {
    options: EditableExtraProp<{
      value: string;
      label: string;
    }>;
  };
}

// Checkbox
export type CheckboxFieldProps = {
  defaultValue: EditableProp;
} & Props;
interface ICheckboxField extends BaseField {
  props: CheckboxFieldProps;
  extraProps: {
    options: EditableExtraProp<{
      value: string;
      label: string;
    }>;
  };
}

// File
interface IFileField extends BaseField {
  acceptedFiles: string;
}

// Column
export interface IColumnField {
  id: SupportedOptions;
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
