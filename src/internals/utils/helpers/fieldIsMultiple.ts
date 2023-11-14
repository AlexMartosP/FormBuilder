import fields from "@/internals/constants/fields";
import {
  SomeFieldExceptColumn,
  SpecialField,
} from "@/internals/types/fieldTypes/fields";

export default function fieldIsMultiple(
  field: SomeFieldExceptColumn
): field is SpecialField {
  if (fields[field.id].multiple) {
    return true;
  }

  return false;
}
