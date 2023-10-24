import { IColumnField, IField } from "./types";

class ColumnField implements IColumnField {
  amount: number;
  columns: IField[];
  id: string;

  constructor(amount: number) {
    this.amount = amount;
    this.columns = [];
    this.id = crypto.randomUUID();
  }
}

export default ColumnField;
