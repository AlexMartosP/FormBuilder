import { AvailableInternalFieldIds } from "../internalFields";

export type Rule = {
  enabled: boolean;
  label: string;
  type: AvailableInternalFieldIds;
  value: string;
  errorMessage?: string;
};

export type RuleSet = {
  required: Rule;
  minLength?: Rule;
  maxLength?: Rule;
};
