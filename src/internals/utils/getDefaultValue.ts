import fields from "../constants/fields";
import { SomeFieldExceptColumn } from "../types/fieldTypes/fields";

export function getDefaultValue(field: SomeFieldExceptColumn): unknown {
  return fields[field.id].defaultValue;
}
