"use client";

import { useEngine } from "@/context/engine/EngineProvider";
import { useMetaSideBarContext } from "@/context/metaSidebar/MetaSidebarProvider";
import { ItemAsField, ItemAsOption, ItemTypes } from "@/internals/types/DND";
import { SomeField } from "@/internals/types/fields";
import { TOption } from "@/internals/types/options";
import { ReactNode } from "react";
import { useDrop } from "react-dnd";

export default function BottomDropZone({
  children,
  fieldKey,
  columnKey,
}: {
  children: ReactNode;
  fieldKey: string;
  columnKey?: string;
}) {
  const { addField, addColumn, moveField } = useEngine();
  const { updateCurrentEditingField } = useMetaSideBarContext();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.Option, ItemTypes.Field],
    drop: (item, monitor) => {
      const itemType = monitor.getItemType();

      if (itemType === ItemTypes.Option) {
        const option = item as ItemAsOption;

        switch (option.id) {
          case "columns":
            addColumn({
              amount: 2,
              fieldKey,
            });
            break;
          case "text_input":
          case "number_input":
          case "email_input":
          case "phone_input":
            addField({
              option,
              name: "t",
              label: "New label",
              fieldKey,
              columnKey,
            });
        }

        updateCurrentEditingField(fieldKey, columnKey);
      } else {
        const field = item as ItemAsField;
        moveField({
          fieldKey: field.engineField.key,
          columnKey: field.columnKey,
          toFieldKey: fieldKey,
          toColumnKey: columnKey,
        });
      }
    },
    canDrop: (item, monitor) => {
      const itemType = monitor.getItemType();

      if (itemType === ItemTypes.Option) {
        const option = item as ItemAsOption;

        if (option.id === "columns" && columnKey) {
          return false;
        }
      } else {
        const field = item as ItemAsField;
        if (field.engineField.id === "columns" && columnKey) {
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
