import { IEngine, Indexes } from "@/internals/types/engine";
import {
  IInputField,
  SomeField,
  SomeFieldExceptColumn,
} from "@/internals/types/fields";
import { SupportedFields } from "@/internals/types/supports";
import { TOption } from "@/internals/types/options";
import { createContext } from "react";

export const EngineContext = createContext<{
  addField: AddFieldFn;
  moveField: MoveFieldFn;
  engine: IEngine;
  updateField: UpdateFieldFn;
} | null>(null);

export type Positions = "bottom" | "left" | "right";

export type AddFieldFn = (args: {
  id: SupportedFields;
  toIndexes: Indexes[string];
  position: Positions;
}) => void;

export type AddColumnFn = (args: {
  amount: number;
  targetIndexes: Indexes[string];
}) => void;

export type MoveFieldFn = ({
  sourceFieldKey,
  sourceIndexes,
  targetIndexes,
  position,
}: {
  sourceFieldKey: string;
  sourceIndexes: Indexes[string];
  targetIndexes: Indexes[string];
  position: Positions;
}) => void;

export type GetFieldByKeys = (
  fieldKey: string,
  columnKey?: string
) => SomeFieldExceptColumn;

export type RemoveFieldFn = (field: IInputField) => void;

export type UpdateFieldFn = (
  fieldKey: string,
  updatedField: SomeFieldExceptColumn
) => void;
