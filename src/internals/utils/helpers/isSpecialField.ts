import fields from "@/internals/constants/fields";
import {
  SomeFieldExceptColumn,
  SpecialField,
} from "../../types/fieldTypes/fields";
import { SupportedFields } from "../../types/supports";

export function isSpecial(id: SupportedFields) {
  return fields[id].hasOptions;
}

export function isSpecialField(
  field: SomeFieldExceptColumn
): field is SpecialField {
  if (isSpecial(field.id)) {
    return true;
  }

  return false;
}
