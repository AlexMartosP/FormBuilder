import { AvailableInternalFieldIds } from "../internalFields";

export type EditableProp = {
  label: string;
  type: AvailableInternalFieldIds;
  value: string;
};

export type Props = Record<string, EditableProp>;
