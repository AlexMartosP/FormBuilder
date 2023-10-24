import { Input } from "@/components/ui/Input";
import { IField, IEngine, Schema, DefaultValues } from "./types";
import items from "./items";
import { ZodType } from "zod";
import Field from "./field";

const dummyFields = [
  new Field({
    label: items[0].label,
    icon: items[0].icon,
    id: items[0].id,
    name: "username",
  }),
  new Field({
    label: items[1].label,
    icon: items[1].icon,
    id: items[1].id,
    name: "age",
  }),
  new Field({
    label: items[2].label,
    icon: items[2].icon,
    id: items[2].id,
    name: "email",
  }),
  new Field({
    label: items[3].label,
    icon: items[3].icon,
    id: items[3].id,
    name: "phone",
  }),
];

class Engine implements IEngine {
  fields: IField[];
  schema: Schema = {};
  defaultValues: DefaultValues = {};

  constructor() {
    this.fields = dummyFields;

    for (let field of dummyFields) {
      this.schema[field.name] = field.getZodType();
      this.defaultValues[field.name] = field.getDefaultValue();
    }
  }

  addField(field: Field) {
    this.fields.push(field);

    this.schema[field.name] = field.getZodType();
    this.defaultValues[field.name] = field.getDefaultValue();
  }
}

export default Engine;
