import { LucideIcon } from "lucide-react";
import { ForwardRefExoticComponent, ReactElement } from "react";
import { ZodAny, ZodType } from "zod";

// Ids
type ids =
  | "text_input"
  | "number_input"
  | "email_input"
  | "phone_input"
  | "columns";

type fieldIds = "text_input" | "number_input" | "email_input" | "phone_input";

// Unions
export type Types = "string" | "number" | "email";

// Utils
export type Element = JSX.ElementType | ForwardRefExoticComponent<any>;

export type Props = Record<string, string>;

export type PresetObject = Record<fieldIds, MetaField>;

// Option
export type Option = {
  label: string;
  icon: LucideIcon;
  id: ids;
};

// Engine
export type RuleSet = {
  required: Rule;
  minLength: Rule;
  maxLength: Rule;
};

export type Rule = {
  errorMessage: string;
} | null;

export type MetaField = {
  element: Element;
  rules: RuleSet;
  props: Props;
  type: Types;
};

export interface IField extends MetaField {
  label: string;
  icon: LucideIcon;
  id: string;
  name: string;
  key: string;
  getZodType(): ZodType;
  getDefaultValue(): unknown;
}

export type Schema = Record<string, ZodType>;
export type DefaultValues = Record<string, unknown>;

export interface IEngine {
  fields: IField[];
  schema: Schema;
  defaultValues: DefaultValues;
}

// Column
export interface IColumnField {
  amount: number;
  columns: IField[];
}

// Context
export type AddFieldFn = (option: Option, name: string, label: string) => void;
export type RemoveFieldFn = (field: IField) => void;
export type UpdateFieldFn = (field: IField, updatedField: IField) => void;
