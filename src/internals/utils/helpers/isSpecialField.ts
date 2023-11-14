import {
  SomeFieldExceptColumn,
  SpecialField,
} from "../../types/fieldTypes/fields";
import { SupportedFields } from "../../types/supports";

export function isSpecial(id: SupportedFields) {
  switch (id) {
    case "text_input":
    case "number_input":
    case "email_input":
    case "phone_input":
      return false;
    case "checkbox":
    case "radio":
      return true;
  }
}

export function isSpecialField(
  field: SomeFieldExceptColumn
): field is SpecialField {
  if (isSpecial(field.id)) {
    return true;
  }

  return false;
}
