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

  getZodType() {
    let type: z.ZodString | z.ZodNumber;
    let code = "";

    switch (this.props.type) {
      case "text":
        type = z.string();
        code = "z.string()";
        break;
      case "number":
        type = z.coerce.number();
        code = "z.coerce.string()";
        break;
      case "email":
        type = z.string().email();
        code = "z.string().email()";
        break;
      case "tel":
        type = z.number();
        code = "z.number()";
        break;
      default:
        throw new Error("Type not valid " + this.props.type);
    }

    if (this.rules.required?.enabled) {
      type = type.min(1, {
        message: this.rules.required.errorMessage,
      });

      code += `.min(1, {
        message: ${this.rules.required.errorMessage},
      })`;
    }

    if (this.rules.maxLength?.enabled) {
      type = (type as z.ZodNumber).max(parseInt(this.rules.maxLength.value), {
        message: this.rules.maxLength.errorMessage,
      });

      code += `.max(${parseInt(this.rules.maxLength.value)}, {
        message: ${this.rules.maxLength.errorMessage},
      })`;
    }

    if (this.rules.minLength?.enabled) {
      type = (type as z.ZodNumber).min(parseInt(this.rules.minLength.value), {
        message: this.rules.minLength.errorMessage,
      });

      code += `.min(${parseInt(this.rules.minLength.value)}, {
        message: ${this.rules.minLength.errorMessage},
      })`;
    }

    return { type, code };
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
