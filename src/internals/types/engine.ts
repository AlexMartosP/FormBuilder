import { ZodType } from "zod";
import { IColumnField, SomeField, SomeFieldExceptColumn } from "./fields";
import ColumnField from "../fieldClasses/columnsField";

export type Schema = Record<string, ZodType>;
export type DefaultValues = Record<string, unknown>;
export type Indexes = Record<
  string,
  {
    topIndex: number;
    columnIndex: number | null;
    fieldIndex: number;
  }
>;

export interface IEngine {
  fields: Record<string, SomeFieldExceptColumn>;
  structure: (string | ColumnField)[];
  schema: Schema;
  defaultValues: DefaultValues;
}
