import { IEngine } from "@/internals/types/engine";
import { IInputField } from "@/internals/types/fields";
import { Option } from "@/internals/types/options";
import { createContext } from "react";

export const EngineContext = createContext<{
  addField: AddFieldFn;
  addColumn: AddColumnFn;
  engine: IEngine;
} | null>(null);

export type AddFieldFn = (option: Option, name: string, label: string) => void;
export type AddColumnFn = (option: Option, amount: number) => void;
export type RemoveFieldFn = (field: IInputField) => void;
export type UpdateFieldFn = (
  field: IInputField,
  updatedField: IInputField
) => void;
