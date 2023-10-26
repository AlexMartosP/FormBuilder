import { useEngine } from "@/context/engine/EngineProvider";
import { ItemAsField, ItemAsOption, ItemTypes } from "@/internals/types/DND";
import { ReactNode } from "react";
import { useDrop } from "react-dnd";
import LeftDropZone from "./LeftDropZone";
import RightDropZone from "./RightDropZone";

export default function SidesDropZone({
  children,
  fieldKey,
  columnKey,
}: {
  children: ReactNode;
  fieldKey: string;
  columnKey?: string;
}) {
  return (
    <div className="flex relative">
      <LeftDropZone fieldKey={fieldKey} columnKey={columnKey} />
      <div className="flex-1">{children}</div>
      <RightDropZone fieldKey={fieldKey} columnKey={columnKey} />
    </div>
  );
}
