import { LucideIcon } from "lucide-react";
import * as z from "zod";
import { Element, IField, Option, Props, RuleSet, Types } from "./types";
import presetFieldMeta from "./presets";

class Field implements IField {
  label: string;
  icon: LucideIcon;
  id: string;
  element: Element;
  rules: RuleSet;
  props: Props;
  type: Types;
  name: string;
  key: string;

  constructor({ label, icon, id, name }: Option & { name: string }) {
    this.label = label;
    this.icon = icon;
    this.id = id;

    this.key = crypto.randomUUID();

    this.element = presetFieldMeta[id].element;
    this.rules = presetFieldMeta[id].rules;
    this.props = presetFieldMeta[id].props;
    this.type = presetFieldMeta[id].type;

    this.name = name;
  }

  getZodType(): z.ZodType {
    switch (this.props.type) {
      case "text":
        return z.string();
      case "number":
        return z.number();
      case "email":
        return z.string().email();
      case "tel":
        return z.number();
      default:
        throw new Error("Type not valid " + this.props.type);
    }
  }

  getDefaultValue(): unknown {
    switch (this.type) {
      case "string":
        return "";
      case "number":
        return 0;
      default:
        throw new Error("Type not valid");
    }
  }
}

export default Field;
