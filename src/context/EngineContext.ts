import Engine from "@/engine/engine";
import { AddColumnFn, AddFieldFn, IEngine } from "@/engine/types";
import { createContext } from "react";

export const EngineContext = createContext<{
  addField: AddFieldFn;
  addColumn: AddColumnFn;
  engine: IEngine;
} | null>(null);
