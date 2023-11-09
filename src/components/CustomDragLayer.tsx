"use client";

import { ItemTypes } from "@/internals/types/DND";
import { useDragLayer } from "react-dnd";
import OptionDragPreview from "./option/OptionDragPreview";
import InputFieldPreview from "./inputField/InputFieldDragPreview";
import FieldPreview from "./field/FieldPreview";

export default function CustomDragLayer() {
  const { item, type, isDragging, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    type: monitor.getItemType(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  function renderDragLayer() {
    switch (type) {
      case ItemTypes.Option:
        return <OptionDragPreview option={item} width={item.width} />;
      case ItemTypes.Field:
        return (
          <FieldPreview
            engineField={item.engineField}
            width={item.width}
            value={item.value}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="fixed pointer-events-none z-50 left-0 top-0 w-full h-full">
      <div
        style={{
          transform: `translate(${currentOffset?.x}px, ${currentOffset?.y}px)`,
        }}
      >
        {renderDragLayer()}
      </div>
    </div>
  );
}
