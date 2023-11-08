import {
  SupportedFormRenderers,
  SupportedValidators,
} from "@/internals/types/fields";
import { createContext } from "react";

export const ConfigContext = createContext<{
  config: TConfig;
  updateConfig: (newConfig: TConfig) => void;
} | null>(null);

export type TConfig = {
  mode: "code" | "preview";
  validator: SupportedValidators;
  formRenderer: SupportedFormRenderers;
};
