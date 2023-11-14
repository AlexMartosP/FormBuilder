import { useEngine } from "@/context/engine/EngineProvider";
import { ItemAsField, ItemAsOption, ItemTypes } from "@/internals/types/DND";
import { ReactNode } from "react";
import { useDrop } from "react-dnd";
import LeftDropZone from "./LeftDropZone";
import RightDropZone from "./RightDropZone";
import { Indexes } from "@/internals/types/engine";

export default function SidesDropZone({
  children,
  fieldKey,
  indexes,
}: {
  children: ReactNode;
  fieldKey: string;
  indexes: Indexes[string];
}) {
  return (
    <div className="flex relative">
      <LeftDropZone fieldKey={fieldKey} indexes={indexes} />
      <div className="flex-1">{children}</div>
      <RightDropZone fieldKey={fieldKey} indexes={indexes} />
    </div>
  );
}
