import * as z from "zod";
import { SupportedValidators } from "../types/supports";

type V = {
  type: unknown;
  code: string;
};
type B = {
  defaultValue: unknown;
  validators: Record<SupportedValidators, V>;
};

type P = {
  hasOptions: true;
  multiple: boolean;
} & B;
type P2 = {
  hasOptions: false;
} & B;
type T = {
  [key: string]: P | P2;
};

const fields = {
  text_input: {
    hasOptions: false,
    multiple: false,
    defaultValue: "",
    validators: {
      zod: {
        type: z.string(),
        code: "z.string()",
      },
    },
  },
  number_input: {
    hasOptions: false,
    multiple: false,
    defaultValue: 0,
    validators: {
      zod: {
        type: z.coerce.number(),
        code: "z.coerce.number()",
      },
    },
  },
  email_input: {
    hasOptions: false,
    multiple: false,
    defaultValue: "",
    validators: {
      zod: {
        type: z.string().email(),
        code: "z.string().email()",
      },
    },
  },
  phone_input: {
    hasOptions: false,
    multiple: false,
    defaultValue: "",
    validators: {
      zod: {
        type: z.string(),
        code: "z.string()",
      },
    },
  },
  checkbox: {
    hasOptions: true,
    multiple: true,
    defaultValue: ["default"],
    validators: {
      zod: {
        type: z.array(z.string()),
        code: "z.array(z.string())",
      },
    },
  },
  radio: {
    hasOptions: true,
    multiple: true,
    defaultValue: "",
    validators: {
      zod: {
        type: z.string(),
        code: "z.string()",
      },
    },
  },
} as const;

export default fields;
