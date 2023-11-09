import { Input } from "@/components/ui/Input";
import { PresetObject } from "../types/helpers";
import { rulePresets } from "./rulePresets";

const metaFieldsPreset: PresetObject = {
  text_input: {
    props: {
      type: "text",
      placeholder: "",
    },
    primitive: "string",
    rules: {
      required: rulePresets["required"],
      minLength: rulePresets["minLength"],
      maxLength: rulePresets["maxLength"],
    },
    // element: Input,
  },
  number_input: {
    props: {
      type: "number",
      placeholder: "",
    },
    primitive: "number",
    rules: {
      required: rulePresets["required"],
      minLength: rulePresets["minLength"],
      maxLength: rulePresets["maxLength"],
    },
    // element: Input,
  },
  email_input: {
    props: {
      type: "email",
      placeholder: "",
    },
    primitive: "string",
    rules: {
      required: rulePresets["required"],
      minLength: rulePresets["minLength"],
      maxLength: rulePresets["maxLength"],
    },
    // element: Input,
  },
  phone_input: {
    props: {
      type: "tel",
      placeholder: "",
    },
    primitive: "string",
    rules: {
      required: rulePresets["required"],
      minLength: rulePresets["minLength"],
      maxLength: rulePresets["maxLength"],
    },
    // element: Input,
  },
  checkbox: {
    // element: "",
    rules: {
      required: rulePresets["required"],
    },
    props: {
      defaultValue: "default",
    },
    primitive: "string",
  },
  radio: {
    // element: "",
    rules: {
      required: rulePresets["required"],
    },
    props: {
      defaultValue: "default",
    },
    primitive: "string",
  },
};

export default metaFieldsPreset;
