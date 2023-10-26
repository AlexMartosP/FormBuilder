"use client";

import { PropsWithChildren, useContext, useState } from "react";
import {
  AddColumnFn,
  AddFieldFn,
  AddFieldToSideFn,
  EngineContext,
  MoveFieldFn,
  MoveFieldToSideFn,
} from "./EngineContext";
import InputField from "@/internals/fieldClasses/inputField";
import ColumnField from "@/internals/fieldClasses/columnsField";
import { IEngine } from "@/internals/types/engine";
import { TOption } from "@/internals/types/options";
import { AvailableFieldIds } from "@/internals/types/ids";
import options from "@/internals/constants/options";
import {
  IColumnField,
  SomeField,
  SomeFieldExceptColumn,
} from "@/internals/types/fields";

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
    placeholder: "Username",
  }),
  new InputField({
    label: options[1].label,
    icon: options[1].icon,
    id: options[1].id,
    name: "age",
    placeholder: "Username",
  }),
  new InputField({
    label: options[2].label,
    icon: options[2].icon,
    id: options[2].id,
    name: "email",
    placeholder: "Username",
  }),
  new InputField({
    label: options[3].label,
    icon: options[3].icon,
    id: options[3].id,
    name: "phone",
    placeholder: "Username",
  }),
  new ColumnField(2),
];

(dummyFields[4] as ColumnField).columns = [
  [
    new InputField({
      label: options[2].label,
      icon: options[2].icon,
      id: options[2].id,
      name: "email",
      placeholder: "Username",
    }),
  ],
  [
    new InputField({
      label: options[3].label,
      icon: options[3].icon,
      id: options[3].id,
      name: "phone",
      placeholder: "Username",
    }),
  ],
];

defaultState.fields = dummyFields;
for (let field of dummyFields) {
  if (field instanceof InputField) {
    defaultState.schema[field.name] = field.getZodType();
    defaultState.defaultValues[field.name] = field.getDefaultValue();
  } else if (field instanceof ColumnField) {
    for (let innerField of field.columns.flat()) {
      defaultState.schema[innerField.name] = innerField.getZodType();
      defaultState.defaultValues[innerField.name] =
        innerField.getDefaultValue();
    }
  }
}

type TopIndexReturn = {
  topIndex: number;
  isInColumn: false;
};

type IndexesReturn = {
  topIndex: number;
  isInColumn: true;
  columnIndex: number;
  fieldIndex: number;
};

function getIndexes(fields: SomeField[], fieldKey: string): TopIndexReturn;
function getIndexes(
  fields: SomeField[],
  fieldKey: string,
  columnKey?: string
): IndexesReturn;
function getIndexes(fields: SomeField[], fieldKey: string, columnKey?: string) {
  for (let topIndex = 0; topIndex < fields.length; topIndex++) {
    if (!columnKey) {
      const field = fields[topIndex] as SomeFieldExceptColumn;

      if (field.key === fieldKey) {
        return {
          topIndex,
          isInColumn: false,
        };
      }
    } else {
      const columnField = fields[topIndex] as IColumnField;

      if (columnField.key === columnKey) {
        const indexes = columnField.getFieldIndex(fieldKey);

        return {
          ...indexes,
          topIndex,
          isInColumn: true,
        };
      }
    }
  }

  throw new Error("Could not find index of field with key: " + fieldKey);
}

function getFieldOfIndexes(
  fields: SomeField[],
  indexes: TopIndexReturn | IndexesReturn
): SomeFieldExceptColumn {
  if (!indexes.isInColumn) {
    return fields[indexes.topIndex] as SomeFieldExceptColumn;
  } else {
    return (fields[indexes.topIndex] as IColumnField).columns[
      indexes.columnIndex
    ][indexes.fieldIndex];
  }
}

function getNewTargetIndex(
  movingFieldIndex: number,
  targetFieldIndex: number,
  extraFieldsCount?: number
) {
  if (movingFieldIndex < targetFieldIndex) {
    return targetFieldIndex + (extraFieldsCount ?? 0);
  }

  return targetFieldIndex + 1;
}

export default function EngineProvider({ children }: PropsWithChildren) {
  const [engine, setEngine] = useState(defaultState);

  const addField: AddFieldFn = ({
    option,
    name,
    label,
    fieldKey,
    columnKey,
  }) => {
    const newEngine = { ...engine };

    const field = new InputField({
      ...option,
      id: option.id as AvailableFieldIds,
      name,
      label,
      placeholder: "",
    });

    if (!columnKey) {
      const { topIndex } = getIndexes(newEngine.fields, fieldKey);

      newEngine.fields.splice(topIndex + 1, 0, field);
    } else {
      const { topIndex, columnIndex, fieldIndex } = getIndexes(
        newEngine.fields,
        fieldKey,
        columnKey
      );

      (newEngine.fields[topIndex] as ColumnField).addField(
        field,
        columnIndex,
        fieldIndex + 1
      );
    }

    newEngine.schema[field.name] = field.getZodType();
    newEngine.defaultValues[field.name] = field.getDefaultValue();
    setEngine(newEngine);
  };

  const addColumn: AddColumnFn = ({ amount, fieldKey }) => {
    const newEngine = { ...engine };

    const column = new ColumnField(amount);

    const fieldIndex = newEngine.fields.findIndex((f) => f.key === fieldKey);

    newEngine.fields.splice(fieldIndex + 1, 0, column);

    setEngine(newEngine);
  };

  const moveField: MoveFieldFn = ({
    fieldKey,
    columnKey,
    toFieldKey,
    toColumnKey,
  }) => {
    const newEngine = { ...engine };

    const movingFieldIdx = getIndexes(newEngine.fields, fieldKey, columnKey);
    const targetFieldIdx = getIndexes(
      newEngine.fields,
      toFieldKey,
      toColumnKey
    );

    let movingField: SomeField;
    let singleColumnFieldsCount: number | undefined;
    if (!movingFieldIdx.isInColumn) {
      movingField = newEngine.fields[movingFieldIdx.topIndex];

      newEngine.fields = newEngine.fields.filter((f) => f.key !== fieldKey);
    } else {
      const columnField = newEngine.fields[
        movingFieldIdx.topIndex
      ] as ColumnField;

      movingField =
        columnField.columns[movingFieldIdx.columnIndex][
          movingFieldIdx.fieldIndex
        ];

      columnField.removeField(fieldKey, movingFieldIdx.columnIndex);

      const singleColumnFields = columnField.getSingleFilledColumnFields();

      if (singleColumnFields) {
        singleColumnFieldsCount = singleColumnFields.length;
        newEngine.fields.splice(
          movingFieldIdx.topIndex,
          1,
          ...singleColumnFields
        );
      }
    }

    if (!targetFieldIdx.isInColumn) {
      newEngine.fields.splice(
        getNewTargetIndex(
          movingFieldIdx.topIndex,
          targetFieldIdx.topIndex,
          singleColumnFieldsCount
        ),
        0,
        movingField
      );
    } else {
      if (movingField!.id !== "columns") {
        const columnField = newEngine.fields[
          getNewTargetIndex(
            movingFieldIdx.topIndex,
            targetFieldIdx.topIndex,
            singleColumnFieldsCount
          ) - 1
        ] as ColumnField;

        columnField.addField(
          movingField as SomeFieldExceptColumn,
          targetFieldIdx.columnIndex,
          targetFieldIdx.fieldIndex + 1
        );
      }
    }

    setEngine(newEngine);
  };

  const addFieldToSide: AddFieldToSideFn = ({
    option,
    name,
    label,
    fieldKey,
    columnKey,
    side,
  }) => {
    const newEngine = { ...engine };

    const field = new InputField({
      ...option,
      id: option.id as AvailableFieldIds,
      name,
      label,
      placeholder: "",
    });

    const targetIndexes = getIndexes(newEngine.fields, fieldKey, columnKey);
    const targetField = newEngine.fields[
      targetIndexes.topIndex
    ] as SomeFieldExceptColumn;

    if (!targetIndexes.isInColumn) {
      const column = new ColumnField(2);

      switch (side) {
        case "left":
          column.addField(field, 0, 0);
          column.addField(targetField, 1, 0);
          break;
        case "right":
          column.addField(field, 1, 0);
          column.addField(targetField, 0, 0);
          break;
      }

      newEngine.fields[targetIndexes.topIndex] = column;
    } else {
    }

    newEngine.schema[field.name] = field.getZodType();
    newEngine.defaultValues[field.name] = field.getDefaultValue();
    setEngine(newEngine);
  };

  const moveFieldToSide: MoveFieldToSideFn = ({
    fieldKey,
    columnKey,
    toFieldKey,
    toColumnKey,
    side,
  }) => {
    const newEngine = { ...engine };

    const movingFieldIdx = getIndexes(newEngine.fields, fieldKey, columnKey);
    const targetFieldIdx = getIndexes(
      newEngine.fields,
      toFieldKey,
      toColumnKey
    );

    const movingField = getFieldOfIndexes(newEngine.fields, movingFieldIdx);
    const targetField = getFieldOfIndexes(newEngine.fields, targetFieldIdx);

    if (!targetFieldIdx.isInColumn) {
      const column = new ColumnField(2);

      switch (side) {
        case "left":
          column.addField(movingField, 0, 0);
          column.addField(targetField, 1, 0);
          break;
        case "right":
          column.addField(movingField, 1, 0);
          column.addField(targetField, 0, 0);
          break;
      }

      newEngine.fields[targetFieldIdx.topIndex] = column;
    } else {
    }

    if (movingFieldIdx.isInColumn) {
      (newEngine.fields[movingFieldIdx.topIndex] as IColumnField).removeField(
        fieldKey,
        movingFieldIdx.columnIndex
      );

      const singleColumnFields = (
        newEngine.fields[movingFieldIdx.topIndex] as IColumnField
      ).getSingleFilledColumnFields();

      if (singleColumnFields) {
        newEngine.fields.splice(
          movingFieldIdx.topIndex,
          1,
          ...singleColumnFields
        );
      }
    } else {
      newEngine.fields.splice(movingFieldIdx.topIndex, 1);
    }

    setEngine(newEngine);
  };

  return (
    <EngineContext.Provider
      value={{
        addField,
        engine,
        addColumn,
        moveField,
        addFieldToSide,
        moveFieldToSide,
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
