import { SpecialField } from "./fieldTypes/fields";

export type SpecialComponentProps = {
  field: SpecialField;
  onChange: (...args: any[]) => void;
  value: string[];
};

export type SpecialComponent = ({}: SpecialComponentProps) => JSX.Element;
