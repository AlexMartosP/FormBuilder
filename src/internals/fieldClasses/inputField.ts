import * as z from "zod";
import { IInputField, Primitivies, RuleSet } from "../types/fields";
import { Element, Props } from "../types/helpers";
import { AvailableFieldIds, AvailableOptionIds } from "../types/ids";
import { TOption } from "../types/options";
import metaFieldsPreset from "../constants/metaFieldsPreset";

type ConstructorInput = {
  name: string;
  id: AvailableFieldIds;
  placeholder: string;
} & TOption;

class InputField implements IInputField {
  label: string;
  id: AvailableOptionIds;
  element: Element;
  rules: RuleSet;
  props: Props;
  primitive: Primitivies;
  name: string;
  key: string;
  placeholder: string;

  constructor({ label, id, name, placeholder }: ConstructorInput) {
    this.label = label;
    this.id = id;
    this.placeholder = placeholder;
    this.name = name;

    this.key = crypto.randomUUID();

    this.element = metaFieldsPreset[id].element;
    this.rules = metaFieldsPreset[id].rules;
    this.props = metaFieldsPreset[id].props;
    this.primitive = metaFieldsPreset[id].primitive;
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
    switch (this.primitive) {
      case "string":
        return "";
      case "number":
        return 0;
      default:
        throw new Error("Type not valid");
    }
  }
}

export default InputField;
