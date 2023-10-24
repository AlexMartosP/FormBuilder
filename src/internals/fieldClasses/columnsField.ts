import { IColumnField, SomeField } from "../types/fields";

class ColumnField implements IColumnField {
  amount: number;
  columns: Exclude<SomeField, IColumnField>[];
  id: string;

  constructor(amount: number) {
    this.amount = amount;
    this.columns = [];
    this.id = crypto.randomUUID();
  }
}

export default ColumnField;
