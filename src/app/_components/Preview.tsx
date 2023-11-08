"use client";

import { useConfig } from "@/context/config/ConfigProvider";
import CodePreview from "./CodePreview";
import FormPreview from "./FormPreview";

export default function Preview() {
  const { config } = useConfig();

  return config.mode === "preview" ? <FormPreview /> : <CodePreview />;
}
