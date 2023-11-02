import { ItemTypes } from "@/internals/types/DND";
import { IInputField } from "@/internals/types/fields";
import { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import InputField from "./InputField";
import { Indexes } from "@/internals/types/engine";

export default function DraggableInputField({
  engineField,
  value,
  indexes,
  ...extraProps
}: {
  engineField: IInputField;
  value: any;
  indexes: Indexes[string];
}) {
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: ItemTypes.Field,
      item: () => ({
        engineField: {
          ...engineField,
        },
        value: value,
        width: widthElementRef.current?.getBoundingClientRect().width,
        indexes,
      }),
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [value]
  );
  const widthElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <div ref={widthElementRef}>
      <div
        ref={drag}
        role="DraggableBox"
        style={{
          opacity: isDragging ? "0.5" : "1",
        }}
      >
        <InputField
          engineField={engineField}
          isPreview={false}
          {...{ ...extraProps, value }}
        />
      </div>
    </div>
  );
}
