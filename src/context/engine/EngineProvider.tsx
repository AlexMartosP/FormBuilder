"use client";

import options from "@/internals/constants/options";
import ColumnField from "@/internals/fieldClasses/columnsField";
import { IEngine } from "@/internals/types/engine";
import { SupportedFields } from "@/internals/types/supports";
import { createField } from "@/internals/utils/createField";
import { getZodType } from "@/internals/utils/fieldTypeGenerators/getzodType";
import { getDefaultValue } from "@/internals/utils/getDefaultValue";
import getNewFieldIndex from "@/internals/utils/helpers/getNewFieldIndex";
import { addFieldToBottom } from "@/internals/utils/structure/addFieldToBottom";
import { addFieldToSide } from "@/internals/utils/structure/addFieldToSide";
import { removeFieldFromStructure } from "@/internals/utils/structure/removeFieldFromStructure";
import { PropsWithChildren, useContext, useState } from "react";
import {
  AddFieldFn,
  EngineContext,
  MoveFieldFn,
  UpdateFieldFn,
} from "./EngineContext";

function getDefaultState(withDummy: boolean) {
  const defaultState: IEngine = {
    fields: {},
    structure: [],
    schema: {},
    defaultValues: {},
  };

  if (withDummy) {
    const dummyFields = [
      createField(options[0].id as SupportedFields),
      createField(options[1].id as SupportedFields),
      createField(options[2].id as SupportedFields),
      createField(options[3].id as SupportedFields),
      createField(options[4].id as SupportedFields),
      createField(options[2].id as SupportedFields),
      createField(options[3].id as SupportedFields),
    ];

    const dummyStructure = [
      dummyFields[0].key,
      dummyFields[1].key,
      dummyFields[2].key,
      dummyFields[3].key,
      dummyFields[4].key,
      new ColumnField(2),
    ];
    (dummyStructure[5] as ColumnField).addField(dummyFields[3].key, 0, 0);
    (dummyStructure[5] as ColumnField).addField(dummyFields[4].key, 1, 0);

    defaultState.structure = dummyStructure;

    for (let i = 0; i < dummyFields.length; i++) {
      const field = dummyFields[i];

      defaultState.fields[field.key] = field;

      defaultState.schema[field.name] = getZodType(field);
      defaultState.defaultValues[field.name] = getDefaultValue(field);
    }
  }

  return defaultState;
}

export default function EngineProvider({ children }: PropsWithChildren) {
  const [engine, setEngine] = useState(() => getDefaultState(true));

  const addField: AddFieldFn = ({ id, toIndexes, position }) => {
    const newEngine = { ...engine };

    const field = createField(id);

    const newStructure =
      position === "bottom"
        ? addFieldToBottom(newEngine.structure, field.key, toIndexes)
        : addFieldToSide(newEngine.structure, field.key, toIndexes, position);

    newEngine.fields[field.key] = field;
    newEngine.structure = newStructure;

    newEngine.schema[field.name] = getZodType(field);

    const newDefaultValues = { ...newEngine.defaultValues };
    newDefaultValues[field.name] = getDefaultValue(field);
    newEngine.defaultValues = newDefaultValues;

    setEngine(newEngine);
  };

  const moveField: MoveFieldFn = ({
    sourceFieldKey,
    sourceIndexes,
    targetIndexes,
    position,
  }) => {
    const newEngine = { ...engine };

    let { newStructure, singleColumnFieldsCount } = removeFieldFromStructure(
      newEngine.structure,
      sourceFieldKey,
      sourceIndexes
    );

    const newIndex = getNewFieldIndex(
      sourceIndexes.topIndex,
      targetIndexes.topIndex,
      singleColumnFieldsCount
    );

    newStructure =
      position === "bottom"
        ? addFieldToBottom(newStructure, sourceFieldKey, {
            topIndex: newIndex,
            columnIndex: null,
            fieldIndex: newIndex,
          })
        : addFieldToSide(
            newStructure,
            sourceFieldKey,
            {
              topIndex: newIndex,
              columnIndex: targetIndexes.columnIndex,
              fieldIndex: newIndex,
            },
            position
          );

    newEngine.structure = newStructure;

    setEngine(newEngine);
  };

  const updateField: UpdateFieldFn = (fieldKey, updatedField, defaultValue) => {
    const newEngine = { ...engine };

    const currentField = newEngine.fields[fieldKey];
    const currentDefaultValue = newEngine.defaultValues[currentField.name];

    delete newEngine.schema[currentField.name];
    delete newEngine.defaultValues[currentField.name];

    newEngine.fields[fieldKey] = updatedField;

    newEngine.schema[updatedField.name] = getZodType(updatedField);
    newEngine.defaultValues[updatedField.name] =
      defaultValue ?? currentDefaultValue;

    setEngine(newEngine);
  };

  return (
    <EngineContext.Provider
      value={{
        addField,
        engine,
        moveField,
        updateField,
      }}
    >
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
