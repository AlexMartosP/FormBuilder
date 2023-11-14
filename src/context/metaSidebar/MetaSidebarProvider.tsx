"use client";

import { PropsWithChildren, useContext, useState } from "react";
import { useEngine } from "../engine/EngineProvider";
import { MetaSideBarContext, TMetaSideBarContext } from "./MetaSidebarContext";
import { SomeFieldExceptColumn } from "@/internals/types/fieldTypes/fields";

export default function MetaSidebarProvider({ children }: PropsWithChildren) {
  const [currentEditingField, setCurrentEditingField] = useState<
    TMetaSideBarContext["currentEditingField"] | null
  >(null);

  const { engine } = useEngine();

  const updateCurrentEditingField: TMetaSideBarContext["updateCurrentEditingField"] =
    (fieldKey) => {
      const field = engine.fields[fieldKey];
      const defaultValue = engine.defaultValues[field.name];

      setCurrentEditingField(fieldKey);
    };

  return (
    <MetaSideBarContext.Provider
      value={{ currentEditingField, updateCurrentEditingField }}
    >
      {children}
    </MetaSideBarContext.Provider>
  );
}

export function useMetaSideBarContext() {
  const context = useContext(MetaSideBarContext);

  if (!context) {
    throw new Error();
  }

  return context;
}
