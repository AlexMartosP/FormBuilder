import {
  SupportedFormRenderers,
  SupportedValidators,
} from "@/internals/types/fields";
import { SupportedStylers } from "@/internals/types/supports";
import { createContext } from "react";

export const ConfigContext = createContext<{
  config: TConfig;
  updateConfig: (newConfig: TConfig) => void;
} | null>(null);

export type TConfig = {
  mode: "code" | "preview";
  validator: SupportedValidators;
  formRenderer: SupportedFormRenderers;
  styler: SupportedStylers;
};
