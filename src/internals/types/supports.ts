// Fields
export type SupportedFields_Regular =
  | "text_input"
  | "number_input"
  | "email_input"
  | "phone_input";

export type SupportedFields_Special = "checkbox" | "radio";

export type SupportedFields = SupportedFields_Regular | SupportedFields_Special;

// Options
export type SupportedOptions = "columns" | SupportedFields;

// Stylers
export type SupportedStylers = "shadcn";

// Validators
export type SupportedValidators = "zod";

// Form renderers
export type SupportedFormRenderers = "react-hook-form";
