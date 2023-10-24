import { IColumnField, IField } from "./types";

class ColumnField implements IColumnField {
  amount: number;
  columns: IField[];

  constructor(amount: number) {
    (this.amount = amount), (this.columns = []);
  }
}

export default ColumnField;
