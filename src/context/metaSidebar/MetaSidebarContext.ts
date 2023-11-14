import { SomeFieldExceptColumn } from "@/internals/types/fieldTypes/fields";
import { createContext } from "react";

export const MetaSideBarContext = createContext<TMetaSideBarContext | null>(
  null
);

export type TMetaSideBarContext = {
  currentEditingField: SomeFieldExceptColumn | null;
  updateCurrentEditingField: (fieldKey: string) => void;
};
