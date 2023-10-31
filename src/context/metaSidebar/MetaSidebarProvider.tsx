"use client";

import { PropsWithChildren, useContext, useState } from "react";
import { MetaSideBarContext, TMetaSideBarContext } from "./MetaSidebarContext";
import { useEngine } from "../engine/EngineProvider";
import { SomeField, SomeFieldExceptColumn } from "@/internals/types/fields";

export default function MetaSidebarProvider({ children }: PropsWithChildren) {
  const { getFieldByKeys } = useEngine();
  const [currentEditingField, setCurrentEditingField] =
    useState<SomeFieldExceptColumn | null>(null);

  const updateCurrentEditingField: TMetaSideBarContext["updateCurrentEditingField"] =
    (fieldKey, columnKey) => {
      const field = getFieldByKeys(fieldKey, columnKey);

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
