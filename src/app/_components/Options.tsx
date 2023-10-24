"use client";

import { useEngine } from "@/context/EngineProvider";
import items from "@/engine/items";

export default function Options() {
  const { addField } = useEngine();

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <div
          onClick={() => {
            addField(item, "Test", "My label");
          }}
          key={item.id}
          className="p-2 flex gap-2 items-center shadow text-card-foreground bg-card border rounded-md"
        >
          <span>{<item.icon size={20} />}</span>
          <span className="text-sm text-muted-foreground font-medium">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
