import { SomeFieldExceptColumn } from "@/internals/types/fields";
import * as z from "zod";

export function getZodType(field: SomeFieldExceptColumn) {
  let type: z.ZodString | z.ZodNumber;
  let code = "";

  switch (field.id) {
    case "text_input":
      type = z.string();
      code = "z.string()";
      break;
    case "number_input":
      type = z.coerce.number();
      code = "z.coerce.string()";
      break;
    case "email_input":
      type = z.string().email();
      code = "z.string().email()";
      break;
    case "phone_input":
      type = z.number();
      code = "z.number()";
      break;
    case "checkbox":
      type = z.string();
      code = "z.string()";
      break;
    case "radio":
      type = z.string();
      code = "z.string()";
      break;
    default:
      throw new Error("Type not valid for: " + field.id);
  }

  if (field.rules.required?.enabled) {
    type = type.min(1, {
      message: field.rules.required.errorMessage,
    });

    code += `.min(1, {
      message: ${field.rules.required.errorMessage},
    })`;
  }

  if (field.rules.maxLength?.enabled) {
    type = (type as z.ZodNumber).max(parseInt(field.rules.maxLength.value), {
      message: field.rules.maxLength.errorMessage,
    });

    code += `.max(${parseInt(field.rules.maxLength.value)}, {
      message: ${field.rules.maxLength.errorMessage},
    })`;
  }

  if (field.rules.minLength?.enabled) {
    type = (type as z.ZodNumber).min(parseInt(field.rules.minLength.value), {
      message: field.rules.minLength.errorMessage,
    });

    code += `.min(${parseInt(field.rules.minLength.value)}, {
      message: ${field.rules.minLength.errorMessage},
    })`;
  }

  return { type, code };
}
