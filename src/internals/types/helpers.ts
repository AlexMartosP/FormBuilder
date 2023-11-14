import { ForwardRefExoticComponent } from "react";
import { SupportedFields } from "./supports";
import { AllFields, FieldMeta } from "./fieldTypes/fields";

export type Element = JSX.ElementType | ForwardRefExoticComponent<any>;

export type PresetObject = {
  [key in SupportedFields]: FieldMeta & { props: AllFields[key]["props"] };
};
