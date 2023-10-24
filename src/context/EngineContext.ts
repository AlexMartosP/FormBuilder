import Engine from "@/engine/engine";
import { AddFieldFn, IEngine } from "@/engine/types";
import { createContext } from "react";

export const EngineContext = createContext<{
  addField: AddFieldFn;
  engine: IEngine;
} | null>(null);
