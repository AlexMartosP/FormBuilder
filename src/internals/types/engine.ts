import ColumnField from "../fieldClasses/columnsField";
import { SomeFieldExceptColumn } from "./fieldTypes/fields";

export type Schema = Record<
  string,
  {
    type: object;
    code: string;
  }
>;
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
