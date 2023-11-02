import { Indexes } from "./engine";
import { TOption } from "./options";

export enum ItemTypes {
  Option = "OPTION",
  Field = "FIELD",
}

export type ItemAsOption = TOption;

export type ItemAsField = {
  engineField: {
    id: string;
    key: string;
  };
  value: string;
  width: number;
  indexes: Indexes[string];
};
