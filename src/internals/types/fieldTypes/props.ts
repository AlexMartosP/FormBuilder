import { AvailableInternalFieldIds } from "../internalFields";

export type EditableProp<Value extends string | string[] = string> = {
  label: string;
  type: AvailableInternalFieldIds;
  value: Value;
};

export type Props = Record<string, EditableProp>;
