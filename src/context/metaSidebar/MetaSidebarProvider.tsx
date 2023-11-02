"use client";

import { SomeFieldExceptColumn } from "@/internals/types/fields";
import { PropsWithChildren, useContext, useState } from "react";
import { useEngine } from "../engine/EngineProvider";
import { MetaSideBarContext, TMetaSideBarContext } from "./MetaSidebarContext";

export default function MetaSidebarProvider({ children }: PropsWithChildren) {
  const { engine } = useEngine();
  const [currentEditingField, setCurrentEditingField] =
    useState<SomeFieldExceptColumn | null>(null);

  const updateCurrentEditingField: TMetaSideBarContext["updateCurrentEditingField"] =
    (fieldKey) => {
      const field = engine.fields[fieldKey] as SomeFieldExceptColumn;

      setCurrentEditingField(field);
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
