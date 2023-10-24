import { ZodType } from "zod";
import { SomeField } from "./fields";

export type Schema = Record<string, ZodType>;
export type DefaultValues = Record<string, unknown>;

export interface IEngine {
  fields: SomeField[];
  schema: Schema;
  defaultValues: DefaultValues;
}
