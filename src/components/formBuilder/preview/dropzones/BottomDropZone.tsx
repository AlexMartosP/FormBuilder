"use client";

import { useEngine } from "@/context/engine/EngineProvider";
import { useMetaSideBarContext } from "@/context/metaSidebar/MetaSidebarProvider";
import { ItemAsField, ItemAsOption, ItemTypes } from "@/internals/types/DND";
import { Indexes } from "@/internals/types/engine";
import { SupportedFields } from "@/internals/types/supports";
import { ReactNode } from "react";
import { useDrop } from "react-dnd";

export default function BottomDropZone({
  children,
  fieldKey,
  indexes,
}: {
  children: ReactNode;
  fieldKey: string;
  indexes: Indexes[string];
}) {
  const { addField, moveField } = useEngine();
  const { updateCurrentEditingField } = useMetaSideBarContext();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.Option, ItemTypes.Field],
    drop: (item, monitor) => {
      const itemType = monitor.getItemType();

      if (itemType === ItemTypes.Option) {
        const option = item as ItemAsOption;

        addField({
          id: option.id as SupportedFields,
          toIndexes: indexes,
          position: "bottom",
        });

        updateCurrentEditingField(fieldKey);
      } else {
        const field = item as ItemAsField;
        moveField({
          sourceFieldKey: field.engineField.key,
          sourceIndexes: field.indexes,
          targetIndexes: indexes,
          position: "bottom",
        });
      }
    },
    canDrop: (item, monitor) => {
      const itemType = monitor.getItemType();

      if (itemType === ItemTypes.Option) {
        const option = item as ItemAsOption;

        if (option.id === "columns" && indexes.columnIndex) {
          return false;
        }
      } else {
        const field = item as ItemAsField;
        if (field.engineField.id === "columns" && indexes.columnIndex) {
          return false;
        }

        if (field.engineField.key === fieldKey) {
          return false;
        }
      }

      return true;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div className="relative">
      {children}
      <div
        ref={drop}
        className="transition-all relative w-full mt-1 rounded-md before:absolute before:-top-4 before:h-[40px] before:w-full"
        style={{
          height: isOver && canDrop ? "40px" : "0",
          backgroundColor: isOver && canDrop ? "#93c5fd" : "transparent",
        }}
      ></div>
    </div>
  );
}
