import ColumnField from "../../fieldClasses/columnsField";
import { Indexes } from "../../types/engine";

export function addFieldToBottom(
  structure: (string | ColumnField)[],
  fieldKey: string,
  toIndexes: Indexes[string]
) {
  const newStructure = [...structure];

  if (newStructure.length === 0) {
    structure.push(fieldKey);
  } else {
    if (!toIndexes.columnIndex) {
      newStructure.splice(toIndexes.topIndex + 1, 0, fieldKey);
    } else {
      (newStructure[toIndexes.topIndex] as ColumnField).addField(
        fieldKey,
        toIndexes.columnIndex,
        toIndexes.fieldIndex + 1
      );
    }
  }

  return newStructure;
}
