import { ZodType } from "zod";
import { Element, Props } from "./helpers";
import { AvailableOptionIds } from "./ids";

// Base
export type Rule<Value = unknown> = {
  value: Value;
  errorMessage: string;
} | null;

export type RuleSet = {
  required: Rule<boolean>;
  minLength: Rule<number>;
  maxLength: Rule<number>;
};

export type MetaField = {
  // May not need "element"
  element: Element;
  rules: RuleSet;
  props: Props;
  primitive: Primitivies;
};

type BaseField = {
  id: AvailableOptionIds;
  label: string;
  key: string;
  name: string;
  getZodType(): ZodType;
  getDefaultValue(): unknown;
} & MetaField;

// Input
export type InputFieldProps = {
  type: string;
} & Props;
export interface IInputField extends BaseField {
  props: Props;
  placeholder: string;
}

// Password

// Select
interface ISelectField extends BaseField {
  options: Record<string, string>;
  defaultValue: string;
}

// Radio
interface IRadioField extends BaseField {
  options: Record<string, string>;
  defaultValue: string;
}

// Checkbox
interface ICheckboxField extends BaseField {
  options: Record<string, string>;
  defaultValue: string;
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
  columns: SomeFieldExceptColumn[][];
  addField(field: SomeFieldExceptColumn, column: number, index: number): void;
  removeField(fieldKey: string, columnIndex?: number): void;
  getFieldIndex(fieldKey: string): {
    fieldIndex: number | null;
    columnIndex: number | null;
  };
  getSingleFilledColumnFields(): SomeFieldExceptColumn[] | null;
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
