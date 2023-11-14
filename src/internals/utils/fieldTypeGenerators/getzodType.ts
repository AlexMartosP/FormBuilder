import fields from "@/internals/constants/fields";
import { SomeFieldExceptColumn } from "@/internals/types/fieldTypes/fields";
import * as z from "zod";

export function getZodType(field: SomeFieldExceptColumn) {
  let type: z.ZodString | z.ZodNumber | z.ZodArray<z.ZodString> =
    fields[field.id].validators.zod.type;
  let code = fields[field.id].validators.zod.code;

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
