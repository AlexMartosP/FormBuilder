import fields from "@/internals/constants/fields";
import {
  SomeFieldExceptColumn,
  SpecialField,
} from "@/internals/types/fieldTypes/fields";

export default function fieldHasOptions(
  field: SomeFieldExceptColumn
): field is SpecialField {
  if (fields[field.id].hasOptions) {
    return true;
  }

  return false;
}
