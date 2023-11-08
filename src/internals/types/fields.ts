import { ZodType } from "zod";
import { Element, Props } from "./helpers";
import { AvailableFieldIds, AvailableOptionIds } from "./ids";
import { Schema } from "./engine";

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
  getZodType(): Schema[string];
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
