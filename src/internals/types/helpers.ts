import { ForwardRefExoticComponent } from "react";
import { AvailableFieldIds } from "./ids";
import { MetaField, Test } from "./fields";

export type Element = JSX.ElementType | ForwardRefExoticComponent<any>;

export type Props = Record<string, string>;

export type PresetObject = {
  [key in AvailableFieldIds]: MetaField & { props: Test[key]["props"] };
};
