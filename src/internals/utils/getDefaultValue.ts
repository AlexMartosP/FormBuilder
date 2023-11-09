import { SomeFieldExceptColumn } from "../types/fields";

export function getDefaultValue(field: SomeFieldExceptColumn): unknown {
  switch (field.primitive) {
    case "string":
      return "";
    case "number":
      return 0;
    default:
      throw new Error("Type not valid");
  }
}
