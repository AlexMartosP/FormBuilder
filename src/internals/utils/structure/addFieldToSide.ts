import { Positions } from "@/context/engine/EngineContext";
import ColumnField from "../../fieldClasses/columnsField";
import { Indexes } from "../../types/engine";

export function addFieldToSide(
  structure: (string | ColumnField)[],
  fieldKey: string,
  toIndexes: Indexes[string],
  position: Positions
) {
  const newStructure = [...structure];

  if (!toIndexes.columnIndex) {
    const column = new ColumnField(2);

    const targetFieldKey = newStructure[toIndexes.topIndex] as string;

    switch (position) {
      case "left":
        column.addField(fieldKey, 0, 0);
        column.addField(targetFieldKey, 1, 0);
        break;
      case "right":
        column.addField(fieldKey, 1, 0);
        column.addField(targetFieldKey, 0, 0);
        break;
    }

    newStructure[toIndexes.topIndex] = column;
  } else {
    // If adding to field already in column
    // Should add new column beside?
  }

  return newStructure;
}
