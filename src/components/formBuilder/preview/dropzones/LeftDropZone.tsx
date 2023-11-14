import { useEngine } from "@/context/engine/EngineProvider";
import { ItemAsField, ItemAsOption, ItemTypes } from "@/internals/types/DND";
import { Indexes } from "@/internals/types/engine";
import { SupportedFields } from "@/internals/types/supports";
import { useDrop } from "react-dnd";

export default function LeftDropZone({
  fieldKey,
  indexes,
}: {
  fieldKey: string;
  indexes: Indexes[string];
}) {
  const { moveField, addField } = useEngine();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.Option, ItemTypes.Field],
    drop: (item, monitor) => {
      const itemType = monitor.getItemType();

      if (itemType === ItemTypes.Option) {
        const option = item as ItemAsOption;

        addField({
          id: option.id as SupportedFields,
          toIndexes: indexes,
          position: "left",
        });
      } else {
        const field = item as ItemAsField;

        moveField({
          sourceFieldKey: field.engineField.key,
          sourceIndexes: field.indexes,
          targetIndexes: indexes,
          position: "left",
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
      className="transition-all relative  mr-1 rounded-md before:absolute before:-right-[40px] before:w-[40px] before:h-full"
      style={{
        width: isOver && canDrop ? "40px" : "0",
        backgroundColor: isOver && canDrop ? "#93c5fd" : "transparent",
      }}
    ></div>
  );
}
