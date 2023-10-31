import { IEngine } from "@/internals/types/engine";
import {
  IInputField,
  SomeField,
  SomeFieldExceptColumn,
} from "@/internals/types/fields";
import { TOption } from "@/internals/types/options";
import { createContext } from "react";

export const EngineContext = createContext<{
  addField: AddFieldFn;
  addColumn: AddColumnFn;
  moveField: MoveFieldFn;
  addFieldToSide: AddFieldToSideFn;
  moveFieldToSide: MoveFieldToSideFn;
  engine: IEngine;
  getFieldByKeys: GetFieldByKeys;
  updateField: UpdateFieldFn;
} | null>(null);

export type AddFieldFn = (args: {
  option: TOption;
  name: string;
  label: string;
  fieldKey: string;
  columnKey?: string;
}) => void;

export type AddColumnFn = (args: { amount: number; fieldKey: string }) => void;
export type MoveFieldFn = ({
  fieldKey,
  columnKey,
  toFieldKey,
  toColumnKey,
}: {
  fieldKey: string;
  toFieldKey: string;
  toColumnKey?: string;
  columnKey?: string;
}) => void;

export type AddFieldToSideFn = (
  args: Parameters<AddFieldFn>["0"] & { side: "left" | "right" }
) => void;

export type MoveFieldToSideFn = (
  args: Parameters<MoveFieldFn>["0"] & { side: "left" | "right" }
) => void;

export type GetFieldByKeys = (
  fieldKey: string,
  columnKey?: string
) => SomeFieldExceptColumn;

export type RemoveFieldFn = (field: IInputField) => void;

export type UpdateFieldFn = (
  field: string,
  columnKey: string,
  updatedField: SomeFieldExceptColumn
) => void;
