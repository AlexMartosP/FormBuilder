import ColumnField from "@/internals/fieldClasses/columnsField";
import { Indexes } from "@/internals/types/engine";

export function removeFieldFromStructure(
  structure: (string | ColumnField)[],
  fieldKey: string,
  fieldIndexes: Indexes[string]
) {
  const newStructure = [...structure];

  let singleColumnFieldsCount: number | undefined;

  if (fieldIndexes.columnIndex === null) {
    newStructure.splice(fieldIndexes.topIndex, 1);
  } else {
    const columnField = newStructure[fieldIndexes.topIndex] as ColumnField;

    columnField.removeField(fieldKey, fieldIndexes.columnIndex);

    const singleColumnFields = columnField.getSingleFilledColumnFields();

    if (singleColumnFields) {
      singleColumnFieldsCount = singleColumnFields.length;

      // SRP?
      newStructure.splice(fieldIndexes.topIndex, 1, ...singleColumnFields);
    }
  }

  return { newStructure, singleColumnFieldsCount };
}
