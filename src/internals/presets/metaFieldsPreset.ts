import { Input } from "@/components/ui/Input";
import { PresetObject } from "../types/helpers";
import { rulePresets } from "./rulePresets";

const metaFieldsPreset: PresetObject = {
  text_input: {
    props: {
      type: {
        label: "Type",
        type: "text_input",
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
    // element: Input,
  },
  number_input: {
    props: {
      type: {
        label: "Type",
        type: "text_input",
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
    // element: Input,
  },
  email_input: {
    props: {
      type: {
        label: "Type",
        type: "text_input",
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
    // element: Input,
  },
  phone_input: {
    props: {
      type: {
        label: "Type",
        type: "text_input",
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
    // element: Input,
  },
  checkbox: {
    // element: "",
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
  radio: {
    // element: "",
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
