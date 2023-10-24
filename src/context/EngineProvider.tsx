"use client";

import { PropsWithChildren, useContext, useState } from "react";
import { EngineContext } from "./EngineContext";
import InputField from "@/internals/fieldClasses/inputField";
import ColumnField from "@/internals/fieldClasses/columnsField";
import { IEngine } from "@/internals/types/engine";
import { Option } from "@/internals/types/options";
import { AvailableFieldIds } from "@/internals/types/ids";
import options from "@/internals/constants/options";

const defaultState: IEngine = {
  fields: [],
  schema: {},
  defaultValues: {},
};

// Dummy
const dummyFields = [
  new InputField({
    label: options[0].label,
    icon: options[0].icon,
    id: options[0].id,
    name: "username",
  }),
  new InputField({
    label: options[1].label,
    icon: options[1].icon,
    id: options[1].id,
    name: "age",
  }),
  new InputField({
    label: options[2].label,
    icon: options[2].icon,
    id: options[2].id,
    name: "email",
  }),
  new InputField({
    label: options[3].label,
    icon: options[3].icon,
    id: options[3].id,
    name: "phone",
  }),
  new ColumnField(2),
];

(dummyFields[4] as ColumnField).columns = [
  new InputField({
    label: options[2].label,
    icon: options[2].icon,
    id: options[2].id,
    name: "email",
  }),
  new InputField({
    label: options[3].label,
    icon: options[3].icon,
    id: options[3].id,
    name: "phone",
  }),
];

defaultState.fields = dummyFields;
for (let field of dummyFields) {
  if (field instanceof InputField) {
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

    const field = new InputField({
      ...option,
      id: option.id as AvailableFieldIds,
      name,
      label,
      placeholder: "",
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
