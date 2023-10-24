"use client";

import { Option } from "@/engine/types";
import { useDrag } from "react-dnd";

export default function Option({ option }: { option: Option }) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "OPTION",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      key={option.id}
      className="p-2 shadow text-card-foreground bg-card border rounded-md"
      ref={dragPreview}
      style={{
        opacity: isDragging ? "0.5" : "1",
      }}
    >
      <div ref={drag} role="Handle" className="flex gap-2 items-center">
        <span>{<option.icon size={20} />}</span>
        <span className="text-sm text-muted-foreground font-medium">
          {option.label}
        </span>
      </div>
    </div>
  );
}
