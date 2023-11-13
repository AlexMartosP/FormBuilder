import { ForwardRefExoticComponent } from "react";
import { SupportedFields } from "./supports";
import { MetaField, Test } from "./fields";

export type Element = JSX.ElementType | ForwardRefExoticComponent<any>;

export type Props = Record<string, string>;

export type PresetObject = {
  [key in SupportedFields]: MetaField & { props: Test[key]["props"] };
};
