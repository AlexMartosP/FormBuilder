import {
  SupportedFields_Regular,
  SupportedFields_Special,
  SupportedOptions,
} from "../supports";
import { EditableProp, Props } from "./props";
import { RuleSet } from "./rules";

// All
export type AllFields = {
  text_input: IInputField;
  number_input: IInputField;
  email_input: IInputField;
  phone_input: IInputField;
  checkbox: SpecialField;
  radio: SpecialField;
};

// Field
export type FieldMeta = {
  rules: RuleSet;
  primitive: Primitivies;
  props: Props;
};

type CommonBase = {
  label: string;
  key: string;
  name: string;
} & FieldMeta;

type BaseField_Regular = {
  id: SupportedFields_Regular;
} & CommonBase;

export type FieldOptions = {
  id: string;
  value: string;
  label: string;
};

export type BaseField_Special = {
  id: SupportedFields_Special;
  options: FieldOptions[];
} & CommonBase;

// Input
export type InputFieldProps = {
  type: EditableProp;
  placeholder: EditableProp;
};
export interface IInputField extends BaseField_Regular {
  props: InputFieldProps;
}

export type SpecialField = BaseField_Special;

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
export type SomeField = IInputField | SpecialField | IColumnField;

export type SomeFieldExceptColumn = Exclude<SomeField, IColumnField>;

// Unions
export type Primitivies = "string" | "number";
