import { RuleSet } from "../types/fields";

export const rulePresets: RuleSet = {
  required: {
    enabled: true,
    value: "true",
    label: "Required",
    type: "checkbox",
  },
  minLength: {
    enabled: false,
    value: "0",
    label: "Min length",
    type: "number_input",
    errorMessage: "Input has to be at least 0 characters",
  },
  maxLength: {
    enabled: false,
    value: "40",
    label: "Max length",
    type: "number_input",
    errorMessage: "Input has to be at most 40 characters",
  },
};
