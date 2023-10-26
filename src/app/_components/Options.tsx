"use client";

import DraggableOption from "@/components/option/DraggableOption";
import options from "@/internals/constants/options";

export default function Options() {
  return (
    <div className="flex flex-col gap-4">
      {options.map((item) => (
        <DraggableOption key={item.id} option={item} />
      ))}
    </div>
  );
}
