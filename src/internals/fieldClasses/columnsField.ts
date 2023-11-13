import {
  IColumnField,
  SomeField,
  SomeFieldExceptColumn,
} from "../types/fields";
import { SupportedOptions } from "../types/supports";

class ColumnField implements IColumnField {
  amount: number;
  columns: string[][];
  key: string;
  id: SupportedOptions = "columns";
  // readonly fields: Exclude<SomeField, IColumnField>[]

  constructor(amount: number) {
    this.amount = amount;
    this.columns = Array.from(new Array(amount), () => []);
    this.key = crypto.randomUUID();
  }

  addField(fieldKey: string, column: number, index: number) {
    this.columns[column].splice(index, 0, fieldKey);
  }

  removeField(fieldKey: string, columnIndex?: number) {
    const idx = !columnIndex ? this.getFieldIndex(fieldKey) : { columnIndex };

    this.columns[idx.columnIndex] = this.columns[idx.columnIndex].filter(
      (f) => f !== fieldKey
    );
  }

  getFieldIndex(fieldKey: string) {
    for (
      let columnIndex = 0;
      columnIndex < this.columns.length;
      columnIndex++
    ) {
      const idx = this.columns[columnIndex].findIndex((f) => f === fieldKey);

      if (idx !== -1) {
        return { fieldIndex: idx, columnIndex: columnIndex };
      }
    }

    throw new Error("Could not find index of field in column: " + this.key);
  }

  getSingleFilledColumnFields() {
    let filledColumnIndexes: number[] = [];

    for (let i = 0; i < this.columns.length; i++) {
      if (this.columns[i].length > 0) {
        filledColumnIndexes.push(i);
      }
    }

    if (filledColumnIndexes.length === 1) {
      return this.columns[filledColumnIndexes[0]];
    } else {
      return null;
    }
  }
}

export default ColumnField;
