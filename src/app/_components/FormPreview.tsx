"use client";

import ShadcnReactHookForm from "@/components/formBuilder/preview/templates/forms/Shadcn_ReactHookForm";
import { useConfig } from "@/context/config/ConfigProvider";
import { Element } from "@/internals/types/helpers";

const templateMap: Record<string, Element> = {
  "shadcn-react-hook-form": ShadcnReactHookForm,
};

export default function FormPreview() {
  const { config } = useConfig();

  const FormComponent = templateMap[config.styler + "-" + config.formRenderer];

  return <FormComponent />;
}
