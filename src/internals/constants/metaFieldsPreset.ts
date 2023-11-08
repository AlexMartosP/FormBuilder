import { Input } from "@/components/ui/Input";
import { PresetObject } from "../types/helpers";
import { RuleSet } from "../types/fields";

const rulePresets: RuleSet = {
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

const metaFieldsPreset: PresetObject = {
  text_input: {
    props: {
      type: "text",
    },
    primitive: "string",
    rules: {
      required: rulePresets["required"],
      minLength: rulePresets["minLength"],
      maxLength: rulePresets["maxLength"],
    },
    element: Input,
  },
  number_input: {
    props: {
      type: "number",
    },
    primitive: "number",
    rules: {
      required: rulePresets["required"],
      minLength: rulePresets["minLength"],
      maxLength: rulePresets["maxLength"],
    },
    element: Input,
  },
  email_input: {
    props: {
      type: "email",
    },
    primitive: "string",
    rules: {
      required: rulePresets["required"],
      minLength: rulePresets["minLength"],
      maxLength: rulePresets["maxLength"],
    },
    element: Input,
  },
  phone_input: {
    props: {
      type: "tel",
    },
    primitive: "string",
    rules: {
      required: rulePresets["required"],
      minLength: rulePresets["minLength"],
      maxLength: rulePresets["maxLength"],
    },
    element: Input,
  },
  checkbox: {
    element: "",
    rules: {
      required: rulePresets["required"],
    },
    props: {},
    primitive: "string",
  },
  radio: {
    element: "",
    rules: {
      required: rulePresets["required"],
    },
    props: {},
    primitive: "string",
  },
};

export default metaFieldsPreset;
