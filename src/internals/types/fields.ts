import { ZodType } from "zod";
import { Element, Props } from "./helpers";

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
  id: string;
  amount: number;
  columns: Exclude<SomeField, IColumnField>[];
}

// Fields union
export type SomeField =
  | IInputField
  | ISelectField
  | ICheckboxField
  | IRadioField
  | IFileField
  | IColumnField;

// Unions
export type Primitivies = "string" | "number";
