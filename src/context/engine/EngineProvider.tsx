"use client";

import options from "@/internals/constants/options";
import ColumnField from "@/internals/fieldClasses/columnsField";
import { IEngine } from "@/internals/types/engine";
import { AvailableFieldIds } from "@/internals/types/ids";
import { createField } from "@/internals/utils/createField";
import { getZodType } from "@/internals/utils/fieldTypeGenerators/getzodType";
import { getDefaultValue } from "@/internals/utils/getDefaultValue";
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

const defaultState: IEngine = {
  fields: {},
  structure: [],
  schema: {},
  defaultValues: {},
};

// Dummy
const dummyFields = [
  createField(options[0].id as AvailableFieldIds),
  createField(options[1].id as AvailableFieldIds),
  createField(options[2].id as AvailableFieldIds),
  createField(options[3].id as AvailableFieldIds),
  createField(options[2].id as AvailableFieldIds),
  createField(options[3].id as AvailableFieldIds),
];

const dummyStructure = [
  dummyFields[0].key,
  dummyFields[1].key,
  dummyFields[2].key,
  dummyFields[3].key,
  new ColumnField(2),
];
(dummyStructure[4] as ColumnField).addField(dummyFields[4].key, 0, 0);
(dummyStructure[4] as ColumnField).addField(dummyFields[5].key, 1, 0);

// defaultState.fields = dummyFields;
defaultState.structure = dummyStructure;

// defaultState.fields = dummyFields;
for (let i = 0; i < dummyFields.length; i++) {
  const field = dummyFields[i];

  defaultState.fields[field.key] = field;

  defaultState.schema[field.name] = getZodType(field);
  defaultState.defaultValues[field.name] = getDefaultValue(field);
}

function getNewTargetIndex(
  movingFieldIndex: number,
  targetFieldIndex: number,
  extraFieldsCount?: number
) {
  if (movingFieldIndex < targetFieldIndex) {
    return targetFieldIndex + (extraFieldsCount ?? 0) - 1;
  }

  return targetFieldIndex;
}

export default function EngineProvider({ children }: PropsWithChildren) {
  const [engine, setEngine] = useState(defaultState);

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
    newEngine.defaultValues[field.name] = getDefaultValue(field);

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

    const newIndex = getNewTargetIndex(
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

  const updateField: UpdateFieldFn = (fieldKey, updatedField) => {
    const newEngine = { ...engine };

    const currentField = newEngine.fields[fieldKey];

    newEngine.fields[fieldKey] = updatedField;

    delete newEngine.schema[currentField.name];
    delete newEngine.defaultValues[currentField.name];

    newEngine.schema[updatedField.name] = getZodType(updatedField);
    newEngine.defaultValues[updatedField.name] = getDefaultValue(updatedField);
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

// type TopIndexReturn = {
//   topIndex: number;
//   isInColumn: false;
// };

// type IndexesReturn = {
//   topIndex: number;
//   isInColumn: true;
//   columnIndex: number;
//   fieldIndex: number;
// };

// function getIndexes(fields: SomeField[], fieldKey: string): TopIndexReturn;
// function getIndexes(
//   fields: SomeField[],
//   fieldKey: string,
//   columnKey?: string
// ): IndexesReturn;
// function getIndexes(fields: SomeField[], fieldKey: string, columnKey?: string) {
//   for (let topIndex = 0; topIndex < fields.length; topIndex++) {
//     if (!columnKey) {
//       const field = fields[topIndex] as SomeFieldExceptColumn;

//       if (field.key === fieldKey) {
//         return {
//           topIndex,
//           isInColumn: false,
//         };
//       }
//     } else {
//       const columnField = fields[topIndex] as IColumnField;

//       if (columnField.key === columnKey) {
//         const indexes = columnField.getFieldIndex(fieldKey);

//         return {
//           ...indexes,
//           topIndex,
//           isInColumn: true,
//         };
//       }
//     }
//   }

//   throw new Error("Could not find index of field with key: " + fieldKey);
// }

// function getFieldOfIndexes(
//   fields: SomeField[],
//   indexes: TopIndexReturn | IndexesReturn
// ): SomeFieldExceptColumn {
//   if (!indexes.isInColumn) {
//     return fields[indexes.topIndex] as SomeFieldExceptColumn;
//   } else {
//     return (fields[indexes.topIndex] as IColumnField).columns[
//       indexes.columnIndex
//     ][indexes.fieldIndex];
//   }
// }

// const addField: AddFieldFn = ({
//   option,
//   name,
//   label,
//   fieldKey,
//   columnKey,
// }) => {
//   const newEngine = { ...engine };

//   const field = new InputField({
//     ...option,
//     id: option.id as AvailableFieldIds,
//     name,
//     label,
//     placeholder: "",
//   });

//   if (!columnKey) {
//     const { topIndex } = getIndexes(newEngine.fields, fieldKey);

//     newEngine.fields.splice(topIndex + 1, 0, field);
//   } else {
//     const { topIndex, columnIndex, fieldIndex } = getIndexes(
//       newEngine.fields,
//       fieldKey,
//       columnKey
//     );

//     (newEngine.fields[topIndex] as ColumnField).addField(
//       field,
//       columnIndex,
//       fieldIndex + 1
//     );
//   }

//   newEngine.schema[field.name] = field.getZodType();
//   newEngine.defaultValues[field.name] = field.getDefaultValue();
//   setEngine(newEngine);
// };

// const moveField: MoveFieldFn = ({
//   fieldKey,
//   columnKey,
//   toFieldKey,
//   toColumnKey,
// }) => {
//   const newEngine = { ...engine };

//   const movingFieldIdx = getIndexes(newEngine.fields, fieldKey, columnKey);
//   const targetFieldIdx = getIndexes(
//     newEngine.fields,
//     toFieldKey,
//     toColumnKey
//   );

//   let movingField: SomeField;
//   let singleColumnFieldsCount: number | undefined;
//   if (!movingFieldIdx.isInColumn) {
//     movingField = newEngine.fields[movingFieldIdx.topIndex];

//     newEngine.fields = newEngine.fields.filter((f) => f.key !== fieldKey);
//   } else {
//     const columnField = newEngine.fields[
//       movingFieldIdx.topIndex
//     ] as ColumnField;

//     movingField =
//       columnField.columns[movingFieldIdx.columnIndex][
//         movingFieldIdx.fieldIndex
//       ];

//     columnField.removeField(fieldKey, movingFieldIdx.columnIndex);

//     const singleColumnFields = columnField.getSingleFilledColumnFields();

//     if (singleColumnFields) {
//       singleColumnFieldsCount = singleColumnFields.length;
//       newEngine.fields.splice(
//         movingFieldIdx.topIndex,
//         1,
//         ...singleColumnFields
//       );
//     }
//   }

//   if (!targetFieldIdx.isInColumn) {
//     newEngine.fields.splice(
//       getNewTargetIndex(
//         movingFieldIdx.topIndex,
//         targetFieldIdx.topIndex,
//         singleColumnFieldsCount
//       ),
//       0,
//       movingField
//     );
//   } else {
//     if (movingField!.id !== "columns") {
//       const columnField = newEngine.fields[
//         getNewTargetIndex(
//           movingFieldIdx.topIndex,
//           targetFieldIdx.topIndex,
//           singleColumnFieldsCount
//         ) - 1
//       ] as ColumnField;

//       columnField.addField(
//         movingField as SomeFieldExceptColumn,
//         targetFieldIdx.columnIndex,
//         targetFieldIdx.fieldIndex + 1
//       );
//     }
//   }

//   setEngine(newEngine);
// };

// const addFieldToSide: AddFieldToSideFn = ({
//   option,
//   name,
//   label,
//   fieldKey,
//   columnKey,
//   side,
// }) => {
//   const newEngine = { ...engine };

//   const field = new InputField({
//     ...option,
//     id: option.id as AvailableFieldIds,
//     name,
//     label,
//     placeholder: "",
//   });

//   const targetIndexes = getIndexes(newEngine.fields, fieldKey, columnKey);
//   const targetField = newEngine.fields[
//     targetIndexes.topIndex
//   ] as SomeFieldExceptColumn;

//   if (!targetIndexes.isInColumn) {
//     const column = new ColumnField(2);

//     switch (side) {
//       case "left":
//         column.addField(field, 0, 0);
//         column.addField(targetField, 1, 0);
//         break;
//       case "right":
//         column.addField(field, 1, 0);
//         column.addField(targetField, 0, 0);
//         break;
//     }

//     newEngine.fields[targetIndexes.topIndex] = column;
//   } else {
//   }

//   newEngine.schema[field.name] = field.getZodType();
//   newEngine.defaultValues[field.name] = field.getDefaultValue();
//   setEngine(newEngine);
// };

// const addColumn: AddColumnFn = ({ amount, targetIndexes }) => {
//   const newEngine = { ...engine };

//   const column = new ColumnField(amount);

//   newEngine.structure.splice(targetIndexes.topIndex + 1, 0, column);

//   setEngine(newEngine);
// };
