import { IEngine, Indexes } from "@/internals/types/engine";
import {
  IInputField,
  SomeField,
  SomeFieldExceptColumn,
} from "@/internals/types/fields";
import { AvailableFieldIds } from "@/internals/types/ids";
import { TOption } from "@/internals/types/options";
import { createContext } from "react";

export const EngineContext = createContext<{
  addField: AddFieldFn;
  moveField: MoveFieldFn;
  moveFieldToSide: MoveFieldToSideFn;
  engine: IEngine;
  updateField: UpdateFieldFn;
} | null>(null);

export type Positions = "bottom" | "left" | "right";

export type AddFieldFn = (args: {
  id: AvailableFieldIds;
  toIndexes: Indexes[string];
  position: Positions;
}) => void;

export type AddColumnFn = (args: {
  amount: number;
  targetIndexes: Indexes[string];
}) => void;

export type MoveFieldFn = ({
  sourceFieldKey,
  targetFieldKey,
  sourceIndexes,
  targetIndexes,
}: {
  sourceFieldKey: string;
  targetFieldKey: string;
  sourceIndexes: Indexes[string];
  targetIndexes: Indexes[string];
}) => void;

export type MoveFieldToSideFn = (
  args: Parameters<MoveFieldFn>["0"] & { side: "left" | "right" }
) => void;

export type GetFieldByKeys = (
  fieldKey: string,
  columnKey?: string
) => SomeFieldExceptColumn;

export type RemoveFieldFn = (field: IInputField) => void;

export type UpdateFieldFn = (
  fieldKey: string,
  updatedField: SomeFieldExceptColumn
) => void;
