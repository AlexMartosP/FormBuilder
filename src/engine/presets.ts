import { Input } from "@/components/ui/Input";
import { PresetObject } from "./types";

const presetFieldMeta: PresetObject = {
  text_input: {
    props: {
      type: "text",
    },
    type: "string",
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
    type: "number",
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
    type: "string",
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
    type: "string",
    rules: {
      required: null,
      minLength: null,
      maxLength: null,
    },
    element: Input,
  },
};

export default presetFieldMeta;
