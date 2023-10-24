"use client";

import { useEngine } from "@/context/EngineProvider";
import Option from "@/components/Option";
import options from "@/internals/constants/options";

export default function Options() {
  const { addField, addColumn } = useEngine();

  return (
    <div className="flex flex-col gap-4">
      {options.map((item) => (
        <Option key={item.id} option={item} />
      ))}
    </div>
  );
}
