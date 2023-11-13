import { SomeFieldExceptColumn } from "../types/fields";

export function getDefaultValue(field: SomeFieldExceptColumn): unknown {
  switch (field.id) {
    case "text_input":
    case "email_input":
    case "phone_input":
      return "";
    case "number_input":
      return 0;
    case "checkbox":
      return ["default"];
    case "radio":
      return "";
    default:
      throw new Error("Type not valid");
  }
}
