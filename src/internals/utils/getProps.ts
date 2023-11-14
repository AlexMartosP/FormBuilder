import { SomeFieldExceptColumn } from "../types/fieldTypes/fields";

export default function getProps(
  field: SomeFieldExceptColumn
): Record<string, string> {
  const props: Record<string, string> = {};

  for (let [k, v] of Object.entries(field.props)) {
    props[k] = v.value;
  }

  return props;
}
