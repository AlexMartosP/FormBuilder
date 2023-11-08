"use client";

import { Button } from "@/components/ui/Button";
import { useConfig } from "@/context/config/ConfigProvider";

export default function Toolbar() {
  const { config, updateConfig } = useConfig();

  return (
    <div className="flex justify-center items-center gap-4">
      <Button
        onClick={() =>
          updateConfig({
            ...config,
            mode: config.mode === "code" ? "preview" : "code",
          })
        }
      >
        {config.mode === "code" ? "Show preview" : "Show code"}
      </Button>
      <p>Select validator</p>
      <p>Select form renderer</p>
    </div>
  );
}
