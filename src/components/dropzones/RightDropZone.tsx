import { useEngine } from "@/context/engine/EngineProvider";
import { ItemAsField, ItemAsOption, ItemTypes } from "@/internals/types/DND";
import { ReactNode } from "react";
import { useDrop } from "react-dnd";

export default function RightDropZone({
  fieldKey,
  columnKey,
}: {
  fieldKey: string;
  columnKey?: string;
}) {
  const { moveField, addFieldToSide, moveFieldToSide } = useEngine();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.Option, ItemTypes.Field],
    drop: (item, monitor) => {
      const itemType = monitor.getItemType();

      if (itemType === ItemTypes.Option) {
        const option = item as ItemAsOption;

        switch (option.id) {
          case "text_input":
          case "number_input":
          case "email_input":
          case "phone_input":
            addFieldToSide({
              option,
              name: "t",
              label: "New label",
              fieldKey,
              columnKey,
              side: "right",
            });
        }
      } else {
        const field = item as ItemAsField;
        moveFieldToSide({
          fieldKey: field.engineField.key,
          columnKey: field.columnKey,
          toFieldKey: fieldKey,
          toColumnKey: columnKey,
          side: "right",
        });
      }
    },
    canDrop: (item, monitor) => {
      const itemType = monitor.getItemType();

      if (itemType === ItemTypes.Option) {
        const option = item as ItemAsOption;

        if (option.id === "columns") {
          return false;
        }
      } else {
        const field = item as ItemAsField;
        if (field.engineField.id === "columns") {
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
    <div
      ref={drop}
      className="transition-all relative  mr-1 rounded-md before:absolute before:-left-[40px] before:w-[40px] before:h-full"
      style={{
        width: isOver && canDrop ? "40px" : "0",
        backgroundColor: isOver && canDrop ? "#93c5fd" : "transparent",
      }}
    ></div>
  );
}
