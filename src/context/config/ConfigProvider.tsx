import { PropsWithChildren, useContext, useState } from "react";
import { ConfigContext, TConfig } from "./ConfigContext";

export default function ConfigProvider({ children }: PropsWithChildren) {
  const [config, setConfig] = useState<TConfig>({
    mode: "preview",
    validator: "zod",
    formRenderer: "react-hook-form",
    styler: "shadcn",
  });

  function updateConfig(newConfig: TConfig) {
    setConfig(newConfig);
  }

  return (
    <ConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);

  if (!context) {
    throw new Error();
  }

  return context;
}
