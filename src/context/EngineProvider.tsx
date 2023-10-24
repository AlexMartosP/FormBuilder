"use client";

import ColumnField from "@/engine/columns";
import Field from "@/engine/field";
import items from "@/engine/items";
import { AvailableFieldIds, IEngine, Option } from "@/engine/types";
import { PropsWithChildren, useContext, useState } from "react";
import { EngineContext } from "./EngineContext";

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
  new ColumnField(2),
];

(dummyFields[4] as ColumnField).columns = [
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
  if (field instanceof Field) {
    defaultState.schema[field.name] = field.getZodType();
    defaultState.defaultValues[field.name] = field.getDefaultValue();
  } else if (field instanceof ColumnField) {
    for (let innerField of field.columns) {
      defaultState.schema[innerField.name] = innerField.getZodType();
      defaultState.defaultValues[innerField.name] =
        innerField.getDefaultValue();
    }
  }
}

export default function EngineProvider({ children }: PropsWithChildren) {
  const [engine, setEngine] = useState(defaultState);

  function addField(option: Option, name: string, label: string): void {
    const newEngine = { ...engine };

    const field = new Field({
      ...option,
      id: option.id as AvailableFieldIds,
      name,
      label,
    });

    newEngine.fields.push(field);
    newEngine.schema[field.name] = field.getZodType();
    newEngine.defaultValues[field.name] = field.getDefaultValue();
    setEngine(newEngine);
  }

  function addColumn(option: Option, amount: number) {
    const newEngine = { ...engine };

    const column = new ColumnField(amount);

    newEngine.fields.push(column);
    setEngine(newEngine);
  }

  console.log(engine.fields);

  return (
    <EngineContext.Provider value={{ addField, engine, addColumn }}>
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
