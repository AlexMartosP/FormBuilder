import fields from "../constants/fields";

// Fields
export type SupportedFields_Regular = keyof {
  [K in keyof typeof fields as (typeof fields)[K]["hasOptions"] extends false
    ? K
    : never]: true;
};

export type SupportedFields_Special = keyof {
  [K in keyof typeof fields as (typeof fields)[K]["hasOptions"] extends true
    ? K
    : never]: true;
};

export type SupportedFields = SupportedFields_Regular | SupportedFields_Special;

// Options
export type SupportedOptions = "columns" | SupportedFields;

// Stylers
export type SupportedStylers = "shadcn";

// Validators
export type SupportedValidators = "zod";

// Form renderers
export type SupportedFormRenderers = "react-hook-form";
