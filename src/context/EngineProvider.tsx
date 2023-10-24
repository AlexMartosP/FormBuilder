"use client";

import { PropsWithChildren, useContext, useState } from "react";
import { EngineContext } from "./EngineContext";
import Engine from "@/engine/engine";
import { IEngine, Option } from "@/engine/types";
import Field from "@/engine/field";
import items from "@/engine/items";

const defaultState: IEngine = {
  fields: [],
  schema: {},
  defaultValues: {},
};

// Dummy
const dummyFields = [
  new Field({
    label: items[0].label,
    icon: items[0].icon,
    id: items[0].id,
    name: "username",
  }),
  new Field({
    label: items[1].label,
    icon: items[1].icon,
    id: items[1].id,
    name: "age",
  }),
  new Field({
    label: items[2].label,
    icon: items[2].icon,
    id: items[2].id,
    name: "email",
  }),
  new Field({
    label: items[3].label,
    icon: items[3].icon,
    id: items[3].id,
    name: "phone",
  }),
];

defaultState.fields = dummyFields;
for (let field of dummyFields) {
  defaultState.schema[field.name] = field.getZodType();
  defaultState.defaultValues[field.name] = field.getDefaultValue();
}

export default function EngineProvider({ children }: PropsWithChildren) {
  const [engine, setEngine] = useState(defaultState);

  function addField(option: Option, name: string, label: string) {
    const newEngine = { ...engine };

    const field = new Field({
      ...option,
      name,
      label,
    });

    newEngine.fields.push(field);
    newEngine.schema[field.name] = field.getZodType();
    newEngine.defaultValues[field.name] = field.getDefaultValue();

    setEngine(newEngine);
  }

  return (
    <EngineContext.Provider value={{ addField, engine }}>
      {children}
    </EngineContext.Provider>
  );
}

export function useEngine() {
  const context = useContext(EngineContext);

  if (!context) {
    throw new Error();
  }

  return context;
}
