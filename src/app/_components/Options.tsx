"use client";

import { useEngine } from "@/context/EngineProvider";
import items from "@/engine/items";
import Option from "@/components/Option";

export default function Options() {
  const { addField, addColumn } = useEngine();

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <Option key={item.id} option={item} />
      ))}
    </div>
  );
}
