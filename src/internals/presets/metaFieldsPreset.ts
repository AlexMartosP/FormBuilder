import { Input } from "@/components/ui/Input";
import { PresetObject } from "../types/helpers";
import { rulePresets } from "./rulePresets";

const metaFieldsPreset: PresetObject = {
  text_input: {
    props: {
      type: {
        label: "Type",
        type: "select",
        value: "text",
      },
      placeholder: {
        label: "Placeholder",
        type: "text_input",
        value: "",
      },
    },
    primitive: "string",
    rules: {
      required: rulePresets["required"],
      minLength: rulePresets["minLength"],
      maxLength: rulePresets["maxLength"],
    },
  },
  number_input: {
    props: {
      type: {
        label: "Type",
        type: "select",
        value: "number",
      },
      placeholder: {
        label: "Placeholder",
        type: "text_input",
        value: "",
      },
    },
    primitive: "number",
    rules: {
      required: rulePresets["required"],
      minLength: rulePresets["minLength"],
      maxLength: rulePresets["maxLength"],
    },
  },
  email_input: {
    props: {
      type: {
        label: "Type",
        type: "select",
        value: "email",
      },
      placeholder: {
        label: "Placeholder",
        type: "text_input",
        value: "",
      },
    },
    primitive: "string",
    rules: {
      required: rulePresets["required"],
      minLength: rulePresets["minLength"],
      maxLength: rulePresets["maxLength"],
    },
  },
  phone_input: {
    props: {
      type: {
        label: "Type",
        type: "select",
        value: "tel",
      },
      placeholder: {
        label: "Placeholder",
        type: "text_input",
        value: "",
      },
    },
    primitive: "string",
    rules: {
      required: rulePresets["required"],
      minLength: rulePresets["minLength"],
      maxLength: rulePresets["maxLength"],
    },
  },
  checkbox: {
    rules: {
      required: rulePresets["required"],
    },
    props: {
      defaultValue: {
        label: "Default value",
        type: "select",
        value: "default",
      },
    },
    primitive: "string",
  },
  radio: {
    rules: {
      required: rulePresets["required"],
    },
    props: {
      defaultValue: {
        label: "Default value",
        type: "text_input",
        value: "default",
      },
    },
    primitive: "string",
  },
};

export default metaFieldsPreset;
