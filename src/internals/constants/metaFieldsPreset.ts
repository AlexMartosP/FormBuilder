import { Input } from "@/components/ui/Input";
import { PresetObject } from "../types/helpers";

const metaFieldsPreset: PresetObject = {
  text_input: {
    props: {
      type: "text",
    },
    primitive: "string",
    rules: {
      required: null,
      minLength: null,
      maxLength: null,
    },
    element: Input,
  },
  number_input: {
    props: {
      type: "number",
    },
    primitive: "number",
    rules: {
      required: null,
      minLength: null,
      maxLength: null,
    },
    element: Input,
  },
  email_input: {
    props: {
      type: "email",
    },
    primitive: "string",
    rules: {
      required: null,
      minLength: null,
      maxLength: null,
    },
    element: Input,
  },
  phone_input: {
    props: {
      type: "tel",
    },
    primitive: "string",
    rules: {
      required: null,
      minLength: null,
      maxLength: null,
    },
    element: Input,
  },
};

export default metaFieldsPreset;
