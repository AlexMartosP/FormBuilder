import { ForwardRefExoticComponent } from "react";
import { AvailableFieldIds } from "./ids";
import { MetaField } from "./fields";

export type Element = JSX.ElementType | ForwardRefExoticComponent<any>;

export type Props = Record<string, string>;

export type PresetObject = Record<AvailableFieldIds, MetaField>;
